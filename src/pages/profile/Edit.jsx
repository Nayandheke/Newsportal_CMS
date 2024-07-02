import { useEffect, useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import http from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
    const user = useSelector(state => state.user.value)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length) {
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address,
            })
        }
    }, [user])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit', form) 
            .then(() => http.get('profile/details'))
            .then(({date}) => {
                dispatch(setUser(data))
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <>
        <h1>Edit Profile</h1>
        <div className="login">
        <div className="login-box">
        <form onSubmit={handleSubmit}>
            <FormItem title="Name" label="name">
                <input type="name" id="name" name="name" required defaultValue={form.name}  onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>
            <FormItem title="Phone" label="phone">
                <input type="phone" id="phone" name="phone" required defaultValue={form.phone} onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>
            <FormItem title="Address" label="address">
                <input type="address" id="address" name="address" required defaultValue={form.address} onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <SubmitBtn loading={loading}/>
        </form>
        </div>
        </div>
    </>
}