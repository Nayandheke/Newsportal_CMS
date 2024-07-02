import { useState } from "react";
import { FormItem, SubmitBtn } from "../../components";
import { inStorage, setInForm } from "../../lib";
import http from "../../http";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        setLoading(true)

        http.post('login',form) 
            .then(({data}) => {
              dispatch(setUser(data.user));
              inStorage('cmstoken' , data.token, remember)
              navigate('/')
            })
            .catch((err) => {})
            .finally(() => setLoading(false))
    }

  return <>
      <div className="login">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <FormItem title="Email" label="email">
                <input type="email" id="email" name="email" required  onChange={ev => setInForm(ev, form, setForm)}/>
            </FormItem>

            <FormItem title="Password" label="password">
                <input type="password" id="password" name="password" required onChange={ev => setInForm(ev,form,setForm)} />
            </FormItem>

            <div className="form-group remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe" onChange={() => setRemember(!remember)} />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <SubmitBtn label="Login" icon="fa-right-to-bracket" loading={loading}/>

            <a href="#" className="forgot-password">
                Forgot Password?
            </a>

          </form>
        </div>
      </div>
    </>
};
