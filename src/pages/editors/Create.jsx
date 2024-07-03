import {  useState } from "react"
import { FormItem, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import Switch from "react-switch"
import { useNavigate } from "react-router-dom"
import http from "../../http"

export const Create = () => {
    const [form, setForm] = useState({status: true})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/editor', form) 
            .then(() => navigate('/editors'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <>
        <h1>Add Editors</h1>
        <div className="login">
        <div className="login-box">
        <form onSubmit={handleSubmit}>
            <FormItem title="Name" label="name">
                <input type="name" id="name" name="name" required defaultValue={form.name}  onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Email" label="email">
                <input type="email" id="email" name="email" required defaultValue={form.email} onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="New Password" label="New Password">
            <input type="password" id="password" name="password" required  onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Confirm Password" label="Confirm_Password">
                <input type="password" id="confirm_password" name="confirm_password" required  onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Phone" label="phone">
                <input type="number" id="phone" name="phone" required defaultValue={form.phone} onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Address" label="address">
                <input as="textarea" id="address" name="address" required defaultValue={form.address} onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Status" label="status">
                <Switch checked= {form.status} onChange={ev => setForm({
                    ...form,
                    status: !form.status,
                })}/>
            </FormItem>

            <SubmitBtn loading={loading} />
        </form>
        </div>
        </div>
    </>
}