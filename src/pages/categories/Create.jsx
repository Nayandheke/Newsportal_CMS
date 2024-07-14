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

        http.post('cms/categories', form)
            .then(() => navigate('/categories'))
            .then(({data}) => {
                dispatch(setUser(data))
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <>
        <h1>Add Categories</h1>
        <div className="login">
        <div className="login-box">
        <form onSubmit={handleSubmit}>
            <FormItem title="Name" label="name">
                <input type="name" id="name" name="name" required defaultValue={form.name}  onChange={ev => setInForm(ev, form, setForm)}/>
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