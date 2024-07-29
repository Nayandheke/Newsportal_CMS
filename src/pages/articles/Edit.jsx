import React, { useEffect, useState } from "react";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import http from "../../http";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export const Edit = () => {
    const [article, setArticle] = useState({});
    const [form, setForm] = useState({ status: true });
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [selectedImgs, setSelectedImgs] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoadingPage(true);
        http.get("cms/categories")
            .then(({ data }) => {
                setCategories(data);
                return http.get(`cms/articles/${params.id}`);
            })
            .then(({ data }) => setArticle(data))
            .catch((err) => {})
            .finally(() => setLoadingPage(false));
    }, [params.id]);

    useEffect(() => {
        if (Object.keys(article).length) {
            setForm({
                title: article.title,
                author: article.author,
                content: article.content,
                description: article.description,
                categoryId: article.categoryId,
                status: article.status,
                featured: article.featured,
                latest: article.latest
            });
        }
    }, [article]);

    useEffect(() => {
        http.get('cms/articles')
            .then(({ data }) => setArticles(data))
            .catch(err => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (form.images && form.images.length) {
            let list = [];
            for (let image of form.images) {
                list.push(image);
            }
            setSelectedImgs(list);
        }
    }, [form.images]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);

        // Check for duplicate article title
        if (articles.some(article => article.title.toLowerCase() === form.title.toLowerCase() && article._id !== params.id)) {
            setError('An article with this title already exists.');
            setLoading(false);
            return;
        }

        let fd = new FormData();

        for (let k in form) {
            if (k === "images") {
                for (let image of form.images) {
                    fd.append("images", image);
                }
            } else {
                fd.append(k, form[k]);
            }
        }

        http.patch(`cms/articles/${params.id}`, fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => navigate('/articles'))
            .catch((err) => {})
            .finally(() => setLoading(false));
    };

    const handleDelete = filename => {
        setLoadingPage(true);

        http.delete(`cms/article/${params.id}/images/${filename}`)
            .then(() => http.get(`cms/article/${params.id}`))
            .then(({ data }) => setArticle(data))
            .catch(() => {})
            .finally(() => setLoadingPage(false));
    };

    return (
        <>
            <h1>Edit Article</h1>
            <div className="login">
                <div className="login-box">
                    {loadingPage ? (
                        <Loading />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            <FormItem title="Title" label="title">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    value={form.title}
                                    onChange={(ev) => setInForm(ev, form, setForm)}
                                />
                            </FormItem>

                            <FormItem title="Author" label="author">
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    required
                                    value={form.author}
                                    onChange={(ev) => setInForm(ev, form, setForm)}
                                />
                            </FormItem>

                            <FormItem title="Content" label="content">
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={form.content}
                                    onChange={value => setForm({
                                        ...form,
                                        content: value
                                    })}
                                />
                            </FormItem>
                            <FormItem title="Description" label="description">
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={form.description}
                                    onChange={value => setForm({
                                        ...form,
                                        description: value
                                    })}
                                />
                            </FormItem>

                            <FormItem title="Categories" label="categoryId">
                                <select
                                    name="categoryId"
                                    id="categoryId"
                                    value={form.categoryId}
                                    onChange={(ev) => setInForm(ev, form, setForm)}
                                    required
                                    className="custom-select"
                                    style={{ width: "90%" }}
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </FormItem>

                            <FormItem type="Images" label="Images">
                                <input
                                    type="file"
                                    name="image"
                                    id="images"
                                    onChange={ev => setForm({
                                        ...form,
                                        images: ev.target.files,
                                    })}
                                    accept="image/*"
                                    multiple
                                />
                                {selectedImgs.length > 0 && (
                                    <div className="image-preview">
                                        {selectedImgs.map((image, i) => (
                                            <div className="image-item" key={i}>
                                                <img src={URL.createObjectURL(image)} className="img-fluid" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FormItem>

                            <FormItem title="Latest" label="latest">
                                <Switch
                                    checked={form.latest}
                                    onChange={() => setForm({
                                        ...form,
                                        latest: !form.latest,
                                    })}
                                />
                            </FormItem>

                            <FormItem title="Featured" label="featured">
                                <Switch
                                    checked={form.featured}
                                    onChange={() => setForm({
                                        ...form,
                                        featured: !form.featured,
                                    })}
                                />
                            </FormItem>

                            <FormItem title="Status" label="status">
                                <Switch
                                    checked={form.status}
                                    onChange={() => setForm({
                                        ...form,
                                        status: !form.status,
                                    })}
                                />
                            </FormItem>

                            <SubmitBtn loading={loading} />
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};
