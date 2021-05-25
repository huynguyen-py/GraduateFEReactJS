/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PanelLogin.scss'
import { Link, BrowserRouter, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthAPI from '../../api/AuthAPI';

Register.propTypes = {
    onLoginChange: PropTypes.func,
};


Register.defaultProps = {
    onLoginChange: null,
};



function Register(props) {
    const { onLoginChange } = props;
    const { register, handleSubmit } = useForm();
    let history = useHistory()


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_rpl, setPassword_rpl] = useState('');

    function handleIsRegister(newBool) {
        if (onLoginChange) {
            onLoginChange(newBool);
        }
    }

    const sigUpBtn = data => {
        // if (data.password !== data.password_rpl) {
        //     alert("Confirm password doesn't matched!");
        //     var pw = document.getElementById("password");
        //     var rppw = document.getElementById("confirm_password");
        //     pw.value = "";
        //     rppw.value = "";
        //     setPassword("");
        //     setPassword_rpl("");
        //     pw.focus()
        // }


        const response = AuthAPI.register(data)
            .then(resp => { console.log(resp); window.alert("Successfully !!!"); })
            .catch(error => { console.log(error); window.alert("Failed !!!"); })
    }



    return (
        <BrowserRouter>
            <div className="signin-form">
                <form onSubmit={handleSubmit(sigUpBtn)}>
                    <h2>Sign Up</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr />
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                            </div>
                            <input ref={register} value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" name="email" placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input ref={register} value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" name="username" placeholder="Username" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input ref={register} value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                            <input ref={register} value={password_rpl} onChange={e => setPassword_rpl(e.target.value)} type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required" /> I accept the <Link to="#">Terms of Use</Link> &amp; <Link to="#">Privacy Policy</Link></label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account?<Link to="#" onClick={() => handleIsRegister(true)}>Sign In here</Link></div>
            </div>
        </BrowserRouter>
    );
}

export default Register;