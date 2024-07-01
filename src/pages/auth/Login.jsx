import { useState } from "react";
import { FormItem } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";

export const Login = () => {
    const [form, setForm] = useState({})

    const handleSubmit = (ev) => {
        ev.preventDefault()

        http.post("login",form) 
            .then()
            .catch()
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
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit"><i className="fa-solid fa-right-to-bracket"></i> Login</button>

            <a href="#" className="forgot-password">
                Forgot Password?
            </a>

          </form>
        </div>
      </div>
    </>
};
