/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter, useHistory } from 'react-router-dom';
import './PanelLogin.scss'
import AuthAPI from '../../api/AuthAPI'
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";

LoginPanel.propTypes = {
    onLoginChange: PropTypes.func,
};

LoginPanel.defaultProps = {
    onLoginChange: null,
};



function LoginPanel(props) {
    const { onLoginChange } = props;
    const { register, errors, handleSubmit } = useForm();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['access_token'])
    const [userMail, setUsermail] = useCookies(['user_mail'])

    let history = useHistory()

    useEffect(() => {
        const checkLogin = async () => {
            if (token['access_token']) {
                history.push('/')
            }
        }
        checkLogin();
    }, [token])

    const loginBtn = data => {

        const response = AuthAPI.login(data.email, data.password)
            .then(resp => {
                setToken('access_token', resp.access_token);
                setUsermail('user_mail', resp.usermail)
            })
            .catch(error => {
                console.log(error);
                window.alert("Login Failed !!!");
            })

        // console.log(window.Cookies(['access_token']));
    }
    function handleIsRegister(newBool) {
        if (onLoginChange) {
            onLoginChange(newBool);
        }
    }

    return (
        <BrowserRouter>
            <div className="signin-form">
                <form onSubmit={handleSubmit(loginBtn)}>
                    <h2>Sign In</h2>
                    <hr />
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                            </div>
                            <input ref={register} required="required" type="email" className="form-control" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                            {errors.email && "Email is required"}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input ref={register} required="required" type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            {errors.password && "Password is required"}
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg" >Login</button>
                    </div>
                </form>

                <div className="text-center">Don't have an account? <Link to="#" onClick={() => handleIsRegister(false)}>Sign Up here</Link></div>
            </div>
        </BrowserRouter>

    );
}

export default LoginPanel;