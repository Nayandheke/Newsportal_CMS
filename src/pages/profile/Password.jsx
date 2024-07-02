import { useEffect, useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import http from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

export const Password = () => {
    const user = useSelector(state => state.user.value)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/password', form)
            .then(() => http.get('profile/details'))
            .then(({data}) => {
                
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <>
    <h1>Change Password</h1>
    <div className="login">
    <div className="login-box">
    <form onSubmit={handleSubmit}>
        <FormItem title="Old Password" label="old password">
            <input type="password" id="oldPassword" name="oldPassword" required   onChange={ev => setInForm(ev, form, setForm)}/>
        </FormItem>
        <FormItem title="New Password" label="New Password">
            <input type="password" id="newPassword" name="newPassword" required  onChange={ev => setInForm(ev, form, setForm)}/>
        </FormItem>
        <FormItem title="Confirm Password" label="Confirm Password">
            <input type="password" id="confirmPassword" name="confirmPassword" required  onChange={ev => setInForm(ev, form, setForm)}/>
        </FormItem>

        <SubmitBtn loading={loading}/>
    </form>
    </div>
    </div>
</>
}