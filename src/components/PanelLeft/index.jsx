/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './leftPanel.scss'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { useCookies } from "react-cookie";
import AuthAPI from '../../api/AuthAPI';


MainLeftPanel.propTypes = {
    isListYourArticle: PropTypes.number.isRequired,
    onListChange: PropTypes.func,
};


MainLeftPanel.defaultProps = {
    onListChange: null,
};


function MainLeftPanel(props) {
    const { isListYourArticle, onListChange } = props;
    const [userMail, setUsermail] = useCookies(['user_mail']);
    const [token, setToken] = useCookies(['access_token']);


    const [username, setUsername] = useState("");
    const [linkAvt, setLinhAvt] = useState("");

    function handleisChangeList(newValue) {
        if (onListChange) {
            onListChange(newValue);
        }

    }



    useEffect(() => {

        const fetchInfoUser = async () => {
            try {
                const response = AuthAPI.getInfo(userMail['user_mail'], token['access_token'])
                    .then(resp => {
                        console.log(resp);
                        setUsername(resp['username']);
                        setLinhAvt(resp['avatar']);
                    })

            } catch (error) {
                console.log("Failed to fetch info", error);
            }

        }

        fetchInfoUser();
    }, []);



    return (
        <Router>
            <div className="left-panel col-3" >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">
                        <img src={"https://res.cloudinary.com/dgnzyfmdt/" + linkAvt} className="rounded-circle mr-3" alt="" style={{ height: "32px", width: "32px" }} />
                        {username}
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link className="" to="#" onClick={() => handleisChangeList(-1)}>
                            <i className="fa fa-home pr-3"></i>
                            List your article
                        </Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link className="" to="#" onClick={() => handleisChangeList(-2)}>
                            <i className="fa fa-file-text-o pr-3"></i>
                                List reported
                        </Link>
                    </li>
                </ul>

                <hr />

                <div className="my-label-article m-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title title-topic">Topics your follow</h4>
                            <hr />
                            <p className="card-text" >
                                <a className="btn btn-outline-primary m-1" onClick={() => handleisChangeList(9)}>Medical</a>
                                <a className="btn btn-outline-primary m-1" onClick={() => handleisChangeList(8)}>Infomation Tech</a>
                                <a className="btn btn-outline-primary m-2" onClick={() => handleisChangeList(4)}>The cancer</a>
                                <a className="btn btn-outline-primary m-1" onClick={() => handleisChangeList(2)}>Event</a>
                                <a className="btn btn-outline-primary m-1" onClick={() => handleisChangeList(3)}>Photograps</a>
                                <a className="btn btn-outline-primary m-2" onClick={() => handleisChangeList(6)}>Food & Drink</a>
                                <a className="btn btn-outline-primary m-2" onClick={() => handleisChangeList(7)}>Health</a>
                                <a className="btn btn-outline-primary m-2" onClick={() => handleisChangeList(5)}>Education</a>
                                <a className="btn btn-outline-primary m-2" onClick={() => handleisChangeList(1)}>Other...</a>
                            </p>
                        </div>
                    </div>

                    <br /> <br />
                    <div className="mt-5">Privacy • Rules • Advertisement <br /> Copyright Medical Community © 2021</div>
                </div>
            </div>
        </Router>
    );
}

export default MainLeftPanel;