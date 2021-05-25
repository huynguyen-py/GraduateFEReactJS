/* eslint-disable */
// import PropTypes from 'prop-types';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import AuthAPI from '../../api/AuthAPI';

import './PanelRight.scss'
MainRightPanel.propTypes = {

};



function MainRightPanel() {
    const [token, setToken] = useCookies(['access_token']);
    const [listTop3, setListTop3] = useState([]);

    useEffect(() => {

        const fetchListTop3 = async () => {
            try {
                const response = AuthAPI.getTop3Author(token['access_token'])
                    .then(resp => {
                        console.log(resp);
                        setListTop3(resp.data);
                    })

            } catch (error) {
                console.log("Failed to fetch top 3 author", error);
            }

        }

        fetchListTop3();
    }, []);


    return (
        <Router>
            <div className="right-panel col-3" >

                <ul className="list-group list-group-flush">
                    <div>
                        <div className="card" >
                            <div className="card-body">
                                <h4 className="card-title">Top Contributors</h4>
                                <hr />

                                {listTop3.map(
                                    record => {
                                        return (
                                            <div key={record.email} >
                                                <Link to="#" className="discussion list-group-item list-group-item-action d-flex">
                                                    <div>
                                                        {record.Followed.length} &#11088; <br />{record.email}
                                                        {/* <button className="btn btn-outline-primary btn-sm ml-2">Follow</button> */}
                                                        {/* {article.list_followed.includes(u_mail) ? <a className="btn btn-outline-danger btn-sm ml-2" onClick={() => FollowOrUn(article.author_name)}>Unfollow</a> : <a className="btn btn-outline-primary btn-sm ml-2" onClick={() => FollowOrUn(article.author_name)}>Follow</a>} */}
                                                    </div>
                                                    <img src={"https://res.cloudinary.com/dgnzyfmdt/" + record.avatar} className="rounded-circle" alt="" style={{ height: "44px", width: "44px" }} />
                                                </Link>
                                            </div>

                                        )
                                    }
                                )}


                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card" >
                            <div className="card-body">
                                <h4 className="card-title">Discussions</h4>
                                <hr />
                                <Link to="#" className="discussion text-uppercase list-group-item list-group-item-action">
                                    <button type="button" className="btn btn-info">10</button>
                                    &nbsp;How do I set HttpOnly cookies in Django?
                                </Link>

                                <Link to="#" className="discussion text-uppercase list-group-item list-group-item-action">
                                    <button type="button" className="btn btn-info">02</button>
                                    &nbsp;What is "melanoma" type of skin cancer?
                                </Link>
                                <Link to="#" className="discussion text-uppercase list-group-item list-group-item-action">
                                    <button type="button" className="btn btn-info">99</button>
                                    &nbsp;How to build Machine learning model?
                                </Link>
                            </div>
                        </div>
                    </div>
                </ul>


                {/* <div className="advertisement">
                    <hr />
                    <img src={temp} className="rounded mr-3  mx-auto d-block" alt="" style={{ height: "244px", width: "260px" }} />

                </div> */}



            </div>
        </Router >
    );
}

export default MainRightPanel;