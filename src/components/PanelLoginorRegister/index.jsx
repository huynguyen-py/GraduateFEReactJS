/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginPanel from './Login'
import RegisterPanel from './Register'
import bglogin from '../../assets/images/bg-login.jpg'
import './PanelLogin.scss'
LoginOrRegister.propTypes = {

};

function LoginOrRegister(props) {
    const [isLogin, setLogin] = useState(true)
    function isRegister(newValue) {
        setLogin(newValue);
    }
    return (
        <div className="container-fluid body">
            <div className='row'>
                <div className="col-4 input-panel">{isLogin ? <LoginPanel onLoginChange={isRegister} /> : <RegisterPanel onLoginChange={isRegister} />}</div>

                <div className="right-signin-form col-7">
                    <h1>Medical.Community</h1>
                    <div className="img-bg"><img src={bglogin} alt=""></img></div>
                </div>
            </div>
        </div>

    );
}

export default LoginOrRegister;