import { useEffect, useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";

export const Edit = () => {
    const [form, setForm] = useState({ status: "Draft" });
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoadingPage(true);
        http.get(`cms/categories/${params.id}`) // Corrected the URL
            .then(({ data }) => setCategories(data))
            .catch(err => console.error(err))
            .finally(() => setLoadingPage(false));
    }, [params.id]); // Corrected the dependency

    useEffect(() => {
        if (Object.keys(categories).length) {
            setForm({
                name: categories.name,

                status: categories.status
            });
        }
    }, [categories]);

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoading(true);

        http.patch(`cms/categories/${params.id}`, form) // Corrected the URL
            .then(() => navigate('/categories'))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Edit categories</h1>
            <div className="login">
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <FormItem title="Name" label="name">
                            <input
                                type="name"
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
                                onChange={ev => setForm({
                                    ...form,
                                    status: !form.status,
                                })}
                            />
                        </FormItem>

                        <SubmitBtn loading={loading} />
                    </form>
                </div>
            </div>
        </>
    );
};
