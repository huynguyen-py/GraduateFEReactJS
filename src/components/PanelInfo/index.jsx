/* eslint-disable */
import React, { useEffect, useState } from 'react';

import './PanelInfo.scss';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import AuthAPI from '../../api/AuthAPI';
import { useForm } from 'react-hook-form';
import myPic from '../../assets/images/my_pic.jpg';

InfoUserSite.propTypes = {

};






function InfoUserSite(props) {

    const [userMail, setUsermail] = useCookies(['user_mail']);
    const [token, setToken] = useCookies(['access_token']);
    const { register, error, handleSubmit } = useForm();


    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [createTime, setCreateTime] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [linkAvt, setLinhAvt] = useState("");
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isUpdate, setisUpdate] = useState(1);


    const updateInfoUser = data => {
        var answer = window.confirm("Are you sure?")
        if (answer) {
            let form_data = new FormData();
            form_data.append('username', username);
            form_data.append('first_name', firstname);
            form_data.append('last_name', lastname);
            form_data.append('address', address);
            form_data.append('phone', phone);
            form_data.append('is_active', true);
            form_data.append('is_staff', true);
            form_data.append('is_verified', true);



            const response = AuthAPI.update(form_data, userMail['user_mail'], token['access_token'])
                .then(resp => { window.confirm("Updated successfully"); console.log(resp); setisUpdate(isUpdate + 1) })
                .catch(error => { window.confirm("Updated failed" + error['0']); })

        } else {
            window.alert("Cancel !!!");
        }

    }

    useEffect(() => {

        const fetchInfoUser = async () => {
            try {
                const response = AuthAPI.getInfo(userMail['user_mail'], token['access_token'])
                    .then(resp => {
                        console.log(resp);
                        setUsername(resp['username']);
                        setFirstname(resp['first_name']);
                        setLastname(resp['last_name']);
                        setCreateTime(resp['create_at'])
                        setIsSuperuser(resp['is_superuser']);
                        setIsActive(resp['is_active']);
                        setIsVerified(resp['is_verified']);
                        setIsStaff(resp['is_staff']);
                        setLinhAvt(resp['avatar']);
                        setPhone(resp['phone']);
                        setAddress(resp['address']);
                    })

            } catch (error) {
                console.log("Failed to fetch info", error);
            }

        }

        fetchInfoUser();
    }, [, isUpdate]);



    return (

        <div className="center-panel col-6"  >
            <div className="main-content">
                <div className="order-xl-1">
                    <div className="card bg-secondary shadow">
                        <div className="card-header bg-white border-0">
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="mb-0">{userMail['user_mail']}</h5>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(updateInfoUser)} encType="multipart/form-data">
                                <h6 className="heading-small text-muted mb-4">User information</h6>

                                <div className="pl-lg-4">
                                    <div className="d-flex justify-content-center pb-3">
                                        <img src={"https://res.cloudinary.com/dgnzyfmdt/" + linkAvt} className="rounded-circle " style={{ height: "80px", width: "80px" }} />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-username">Username</label>
                                                <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="input-email">Email address</label>
                                                <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" value={userMail['user_mail']} onChange={e => setUsermail(e.target.value)} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                                <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                                                <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"></hr>
                                <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-address">Address</label>
                                                <input id="input-address" className="form-control form-control-alternative" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-create-at">Joined at</label>
                                                <input id="input-create-at" className="form-control form-control-alternative" placeholder="Date create" value={createTime} onChange={e => setCreateTime(e.target.value)} type="text" disabled />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" htmlFor="input-Phone">Phone</label>
                                                <input type="text" id="input-phone" className="form-control form-control-alternative" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr className="my-4"></hr>
                                <h6 className="heading-small text-muted mb-4">Rule Account</h6>
                                <div className="pl-lg-4">
                                    <div className="form-group row">
                                        <div className="form-check form-check-inline col-lg-3">
                                            <input type="checkbox" name="site_name"
                                                value='Is superuser'
                                                checked={isSuperuser}
                                                readOnly={true}
                                            />Is superuser
                                        </div>

                                        <div className="form-check form-check-inline col-lg-3">
                                            <input type="checkbox" name="site_name"
                                                value='Is verified'
                                                checked={isVerified}
                                                readOnly={true}
                                            />Is verified
                                        </div>
                                        <div className="form-check form-check-inline col-lg-3">
                                            <input type="checkbox" name="site_name"
                                                value='Is staff'
                                                checked={isStaff}
                                                readOnly={true}
                                            />Is staff
                                        </div>
                                        <div className="form-check form-check-inline col-lg-2">
                                            <input type="checkbox" name="site_name"
                                                value='Is active'
                                                checked={isActive}
                                                readOnly={true}
                                            />Is active
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row d-flex flex-row-reverse">
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Action Now</button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default InfoUserSite;

