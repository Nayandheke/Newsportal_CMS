import { useState, useEffect } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import http from "../../http";

export const Create = () => {
    const [form, setForm] = useState({ status: true });
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        http.get('cms/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(err => {
            });
    }, []);

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoading(true);

        if (categories.some(category => category.name.toLowerCase() === form.name.toLowerCase())) {
            setError('Category with this name already exists.');
            setLoading(false);
            return;
        }

        http.post('cms/categories', form)
            .then(() => navigate('/categories'))
            .catch(err => {
                console.error('Failed to create category', err);
            })
            .finally(() => setLoading(false));
    };

    return <>
        <h1>Add Categories</h1>
        <div className="login">
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <FormItem title="Name" label="name">
                        <input type="text" id="name" name="name" required defaultValue={form.name} onChange={ev => setInForm(ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Status" label="status">
                        <Switch checked={form.status} onChange={ev => setForm({
                            ...form,
                            status: !form.status,
                        })} />
                    </FormItem>

                    <SubmitBtn loading={loading} />
                </form>
            </div>
        </div>
    </>;
};
