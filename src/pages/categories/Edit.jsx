import { useEffect, useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";

export const Edit = () => {
    const [form, setForm] = useState({ status: true });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoadingPage(true);
        http.get(`cms/categories/${params.id}`)
            .then(({ data }) => {
                setForm({
                    name: data.name,
                    status: data.status
                });
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingPage(false));
    }, [params.id]);

    useEffect(() => {
        // Fetch all categories to check for duplicates
        http.get('cms/categories')
            .then(({ data }) => setCategories(data))
            .catch(err => console.error('Failed to fetch categories', err));
    }, []);

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoading(true);

        // Check for duplicate category name
        if (categories.some(category => category.name.toLowerCase() === form.name.toLowerCase() && category._id !== params.id)) {
            setError('Category with this name already exists.');
            setLoading(false);
            return;
        }

        http.patch(`cms/categories/${params.id}`, form)
            .then(() => navigate('/categories'))
            .catch(err => console.error('Failed to update category', err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Edit Categories</h1>
            <div className="login">
                <div className="login-box">
                    {loadingPage ? <div>Loading...</div> : (
                        <form onSubmit={handleSubmit}>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            <FormItem title="Name" label="name">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue={form.name}
                                    onChange={ev => setInForm(ev, form, setForm)}
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
