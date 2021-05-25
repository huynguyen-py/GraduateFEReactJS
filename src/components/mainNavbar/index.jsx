/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom'
import './mainNavbar.scss'
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";

MainNav.propTypes = {
    isDiagnosis: PropTypes.number.isRequired,
    onDiagnosisChange: PropTypes.func,
};

MainNav.defaultProps = {
    onDiagnosisChange: null,
};


function MainNav(props) {
    const { isDiagnosis, onDiagnosisChange } = props;
    const [token, setToken, removeToken] = useCookies(['access_token'])
    const [isLogin, setLogin] = useState(true)

    let history = useHistory()

    function handleisDiagnosis(newValue) {
        if (onDiagnosisChange) {
            onDiagnosisChange(newValue);
        }

    }

    const logoutBtn = () => {
        if (token['access_token']) {
            removeToken(['access_token'])
            history.push('/login-register')
        }
    }


    useEffect(() => {

        if (token['access_token']) {
            setLogin(false);
        }

    }, [])
    return (
        <React.Fragment>
            <Router>
                <nav className="navbar navbar-icon-top navbar-expand-lg shadow-lg bg-light">
                    <a className="navbar-brand" href="/">MediCom</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <div className="form-inline my-2 my-lg-0 nav-item">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search </button>
                            </div>
                            <li className="nav-item" id="home">
                                <Link className="nav-link" to="#" onClick={() => handleisDiagnosis(0)}>
                                    <i className="fa fa-home"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" id="diagnosis">
                                <Link className="nav-link" to="#" onClick={() => handleisDiagnosis(1)}>
                                    <i className="fa fa-user-md">
                                        <span className="badge badge-danger">new</span>
                                    </i>
                                    Diagnosis
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="#" onClick={() => handleisDiagnosis(-1)}>
                                    <i className="fa fa-address-card" />
                                    Info
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ">
                            <li className="nav-item">{isLogin ?

                                <a className="btn btn-outline-primary" href="/login-register">
                                    <i className="fa fa-power-off"></i>
                                    &nbsp; Login
                                </a>
                                :

                                <Link className="btn btn-outline-danger" to="" onClick={logoutBtn}>
                                    <i className="fa fa-power-off"></i>
                                    &nbsp; Logout
                                </Link>
                            }
                            </li>
                        </ul>
                    </div>
                </nav>

            </Router>

        </React.Fragment >
    );
}

export default MainNav;