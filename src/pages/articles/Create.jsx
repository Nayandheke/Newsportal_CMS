import React, { useEffect, useState } from "react";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
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

export const Create = () => {
    const [form, setForm] = useState({ status: true });
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedImgs, setSelectedImgs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (form.images && form.images.length) {
            let list = [];
            for (let image of form.images) {
                list.push(image);
            }

            setSelectedImgs(list);
        }
    }, [form.images]);

    useEffect(() => {
        http.get('cms/categories')
           .then(({ data }) => setCategories(data))
           .catch(err => {})
           .finally(() => setLoading(false));
    }, []);

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoading(true);

        let fd = new FormData();

        for (let k in form) {
            if (k === 'images') {
                for (let image of form.images) {
                    fd.append('images', image);
                }
            } else {
                fd.append(k, form[k]);
            }
        }

        http.post('cms/articles', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => navigate('/articles'))
            .catch(err => {})
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Add Articles</h1>
            <div className="login">
                <div className="login-box">
                    {loadingPage ? <Loading /> : 
                        <form onSubmit={handleSubmit}>
                            <FormItem title="Title" label="title">
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    required 
                                    value={form.title || ''} 
                                    onChange={ev => setInForm(ev, form, setForm)} 
                                />
                            </FormItem>

                            <FormItem title="Author" label="author">
                                <input 
                                    type="text" 
                                    id="author" 
                                    name="author" 
                                    required 
                                    value={form.author || ''} 
                                    onChange={ev => setInForm(ev, form, setForm)} 
                                />
                            </FormItem>

                            <FormItem title="Content" label="content">
                                <ReactQuill 
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={form.content || ''}
                                    onChange={value => setForm({ ...form, content: value })}
                                />
                            </FormItem>

                            <FormItem title="Description" label="description">
                                <ReactQuill 
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={form.description || ''}
                                    onChange={value => setForm({ ...form, description: value })}
                                />
                            </FormItem>

                            <FormItem title="Categories" label="categoryId">
                                <select
                                    name="categoryId"
                                    id="categoryId"
                                    value={form.categoryId || ''}
                                    onChange={ev => setInForm(ev, form, setForm)}
                                    required
                                    className="custom-select"
                                    style={{ width: '90%' }}
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map(category => (
                                        <option value={category._id} key={category._id}>
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
                                    required
                                />
                                {selectedImgs.length > 0 && (
                                    <div className="image-preview">
                                        {selectedImgs.map((image, i) => (
                                            <div className="image-item" key={i}>
                                                <img src={URL.createObjectURL(image)} alt={`Image ${i + 1}`} className="img-fluid" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FormItem>

                            <FormItem title="Latest" label="latest">
                                <Switch checked={form.latest || false} onChange={() => setForm({
                                    ...form,
                                    latest: !form.latest,
                                })} />
                            </FormItem>

                            <FormItem title="Featured" label="featured">
                                <Switch checked={form.featured || false} onChange={() => setForm({
                                    ...form,
                                    featured: !form.featured,
                                })} />
                            </FormItem>

                            <FormItem title="Status" label="status">
                                <Switch checked={form.status || false} onChange={() => setForm({
                                    ...form,
                                    status: !form.status,
                                })} />
                            </FormItem>

                            <SubmitBtn loading={loading} />
                        </form>
                    }
                </div>
            </div>
        </>
    );
};
