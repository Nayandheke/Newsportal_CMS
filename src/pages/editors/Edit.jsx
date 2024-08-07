import { useEffect, useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import Switch from "react-switch";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";

export const Edit = () => {
    const [form, setForm] = useState({ status: true });
    const [editor, setEditors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoadingPage(true);
        http.get(`cms/editor/${params.id}`) // Corrected the URL
            .then(({ data }) => setEditors(data))
            .catch(err => console.error(err))
            .finally(() => setLoadingPage(false));
    }, [params.id]); // Corrected the dependency

    useEffect(() => {
        if (Object.keys(editor).length) {
            setForm({
                name: editor.name,
                phone: editor.phone,
                address: editor.address,
                status: editor.status
            });
        }
    }, [editor]);

    const handleSubmit = ev => {
        ev.preventDefault();
        setLoading(true);

        http.patch(`cms/editor/${params.id}`, form) // Corrected the URL
            .then(() => navigate('/editors'))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Edit Editor</h1>
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

                        <FormItem title="Phone" label="phone">
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                required
                                defaultValue={form.phone}
                                onChange={ev => setInForm(ev, form, setForm)}
                            />
                        </FormItem>

                        <FormItem title="Address" label="address">
                            <input
                                as="textarea"
                                id="address"
                                name="address"
                                required
                                defaultValue={form.address}
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
