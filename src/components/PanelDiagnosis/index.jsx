/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './PanelDiagnosis.scss';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import DiagnosisAPI from '../../api/DiagnosisAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import carousel0 from '../../assets/images/carousel0.png';
import carousel1 from '../../assets/images/carousel1.png';
import logomain from '../../assets/images/logo.png';
PanelDiagnosis.propTypes = {

};

function PanelDiagnosis(props) {
    const [imageRecord, setImageRecord] = useState();
    const [index_anatom, setIndex_anatom] = useState(0);
    const [anatom_site_general_challenge, setAnatom] = useState(["abdoben", "back", "chest", "ear", "face"
        , "foot", "hand", "head/neck", "torsor", "palm/soles"
        , "upper extremity", "upper extremity", "lower extremity"]);
    const [gender, setGender] = useState("");
    const [age_approx, setAgeApprox] = useState(1);
    const [token, setToken] = useCookies(['access_token']);
    const [diagnosisList, setDiagnosisList] = useState([]);
    const { register, error, handleSubmit } = useForm();
    const [predRecord, setpredRecord] = useState([]);
    const [idToUpdate, setIdToUpdate] = useState(-1);
    const [isUpdateDeleted, setisUpdateDeleted] = useState(1);


    const InfoRecord = ({ closeToast }) => (
        <div className="row">
            <div className="col-7">

                <div className="form-group row">
                    <div className="col-sm-4 m-0 p-0">
                        <img className="img-thumbnail" src={logomain} alt="logo-congty" style={{ height: "40px", width: "100px" }} />
                    </div>
                    <div className="col-sm-8">
                        <h3>Diagnostic Results</h3>
                    </div>
                </div>
                <div className="form-group row lead">
                    <div className="col-sm-4 m-0 p-0">
                        <label htmlFor="username" className="col-sm-6 col-form-label">Patient name:</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control-plaintext" id="username" value={predRecord.data['author']} />
                    </div>
                </div>

                <div className="form-group row lead">
                    <div className="col-sm-4 m-0 p-0">
                        <label htmlFor="ageApprox" className="col-sm-6 col-form-label">Age approx:</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control-plaintext" id="ageApprox" value={predRecord.data['age_approx']} />
                    </div>
                </div>
                <div className="form-group row lead">
                    <div className="col-sm-4 m-0 p-0">
                        <label htmlFor="gender" className="col-sm-6 col-form-label">Gender:</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control-plaintext" id="gender" value={predRecord.data['gender']} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-4 m-0 p-0">
                        <label htmlFor="predicted" className="col-sm-6 col-form-label">Result predicted:</label>
                    </div>
                    <div className="col-sm-8">
                        <br />
                        {predRecord.record == "0" ?
                            < button readOnly className="form-control-plaintext btn-primary" >Âm tính</button> :
                            < button readOnly className="form-control-plaintext btn-danger" >Dương tính</button>
                        }
                    </div>
                </div>
            </div>
            <div className="col-5">
                <img src={"https://res.cloudinary.com/dgnzyfmdt/" + predRecord.data['image_record']} style={{ width: '380px', height: '400px' }} alt="" />
            </div>

        </div>


    );


    const notifySuccess = () => {
        toast.success("Create successfully!!", {
            position: toast.POSITION.TOP_CENTER
            , autoClose: 2500
        });
    };
    const notifyErrorr = () => {
        toast.error("Error invalid data!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500
        });
    };

    const notifyPredResult = () => {
        toast(<div>{predRecord && <h1><InfoRecord /></h1>}</div>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            onClose: () => ReactDOM.render(<p></p>, document.getElementById('loading')),
        });
    };



    const createDiagnosisBtn = data => {

        let form_data = new FormData();
        form_data.append('image_record', imageRecord);
        form_data.append('gender', gender);
        form_data.append('anatom_site_general_challenge', anatom_site_general_challenge[index_anatom]);
        form_data.append('age_approx', age_approx);

        const response = DiagnosisAPI.create(form_data, token['access_token'])
            .then(resp => { notifySuccess(); })
            .catch(error => { notifyErrorr(); })
    }



    const GetdiagnosisBtn = data => {
        try {
            const response = DiagnosisAPI.getAll(token['access_token'])
                .then(resp => setDiagnosisList(resp))
                .catch(error => console.log(error))
        } catch (error) {
            console.log("Failed to fetch Diagnosis Record list", error);
        }
    }





    function PredictBtn(data) {
        let form_data = new FormData();
        form_data.append('id', data.id);
        form_data.append('token', token['access_token']);
        ReactDOM.render(<FullPageLoader />, document.getElementById('loading'));
        const response = DiagnosisAPI.predict(form_data)
            .then(resp => {
                console.log(resp);
                setpredRecord(resp);
            })
            .catch(error => console.log(error))
    }

    function getDataToUpdateBtn(data) {
        setAnatom(data.anatom_site_general_challenge);
        setGender(data.gender);
        setAgeApprox(data.age_approx);
        setIdToUpdate(data.id)
    }


    const UpdateBtn = data => {

        let form_data = new FormData();
        form_data.append('image_record', imageRecord);
        form_data.append('gender', gender);
        form_data.append('anatom_site_general_challenge', anatom_site_general_challenge[index_anatom]);
        form_data.append('age_approx', age_approx);



        const response = DiagnosisAPI.update(form_data, idToUpdate, token['access_token'])
            .then(resp => { notifySuccess(); console.log(resp); setisUpdateDeleted(isUpdateDeleted + 1); })
            .catch(error => { notifyErrorr(); console.log(error); })
        // console.log(gender + " " + anatom_site_general_challenge + " " + age_approx + " " + idToUpdate)

    }

    function DeleteBtn(id) {
        console.log("deleted")
        var answer = window.confirm("Are you sure?")
        if (answer) {
            const response = DiagnosisAPI.delete(id, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    window.alert("Deleted !!!");
                    setisUpdateDeleted(isUpdateDeleted + 1)
                })
                .catch(error => { console.log(error) })
            // setDeleted(false);
        } else {
            window.alert("Cancel !!!");
        }
    }

    useEffect(() => {
        GetdiagnosisBtn();
    }, [isUpdateDeleted])




    useEffect(() => {

        const fetchPreddata = async () => {
            { typeof predRecord.data !== 'undefined' ? notifyPredResult() : null }

        }

        fetchPreddata();
    }, [predRecord]);

    return (
        <Router>
            <ToastContainer limit={3} className="my-toast" style={{ height: "400px", width: "400px" }} />
            <div className="diagnosis-panel col-6">
                {/* {isFirststep ? <div></div> : */}
                <div id="demo" className="carousel slide mt-3" data-ride="carousel">

                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                    </ul>


                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={carousel0} alt="Los Angeles" width="680" height="400" />
                        </div>
                        <div className="carousel-item">
                            <img src={carousel1} alt="Chicago" width="680" height="400" />
                        </div>
                    </div>


                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
                {/* } */}
                <div id="loading"></div>
                <ul className="nav nav-tabs pt-3">
                    <li id="first_tab" className="nav-item p-3">
                        <a className="nav-link btn btn-warning" data-toggle="tab" href="#menu1"><h5>First Step</h5></a>
                    </li>
                    <li id="seccond_tab" className="nav-item p-3" onClick={GetdiagnosisBtn}>
                        <a className="nav-link btn btn-info " data-toggle="tab" href="#menu2"><h5>Seccond Step</h5></a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="menu1" className="container tab-pane fade active"><br />
                        <form onSubmit={handleSubmit(createDiagnosisBtn)} encType="multipart/form-data">
                            <br />
                            <h2>Diagnosis Skin Cancer "Melanoma"</h2> <br />
                            <p className="hint-text">Import your image and fill all input bellow. It's free and only takes a minute.</p>
                            <div className="form-group">
                                <input ref={register} required="required" accept="image/png, image/jpeg" name="imagerecord" type="file" onChange={e => setImageRecord(e.target.files[0])} />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 col-form-label">Where does it appear?</label>
                                {/* <input ref={register} name="anatom" type="text" className="form-control" value={anatom_site_general_challenge} onChange={e => setAnatom(e.target.value)} placeholder="Anatom Site General Challenge" required="required" /> */}
                                <div>
                                    <select name="anatom" ref={register} defaultValue={index_anatom}
                                        onChange={e => setIndex_anatom(e.target.selectedIndex)}
                                    >
                                        <option value="Abdoben">Abdoben</option>
                                        <option value="Back">Back</option>
                                        <option value="Chest">Chest</option>
                                        <option value="Ear">Ear</option>
                                        <option value="Face">Face</option>
                                        <option value="Foot">Foot</option>
                                        <option value="Hand">Hand</option>
                                        <option value="Head/Neck">Head/neck</option>
                                        <option value="Torsor">Torsor</option>
                                        <option value="Palms/Soles">Palms/Soles</option>
                                        <option value="upper extremity">Upper extremity</option>
                                        <option value="lower extremity">Lower extremity</option>

                                    </select>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <input ref={register} className="form-check-input" type="radio" name="GenderRadioOptions" id="inlineRadio1" value={gender} onChange={e => setGender("Male")} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input ref={register} className="form-check-input" type="radio" name="GenderRadioOptions" id="inlineRadio2" value={gender} onChange={e => setGender("Female")} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                            </div>

                            <div className="form-group mt-3">
                                <label className="col-sm-4 col-form-label">How old are you?</label>
                                <input ref={register} type="number" className="form-control" name="age_approx" placeholder="Age approx" required="required" value={age_approx} onChange={e => setAgeApprox(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-check-label"><input type="checkbox" required="required" />
                        I accept the <a href="http://127.0.0.1:8000/media/covers/nguyenhuy1999jx2%40gmail.com/38025.jpg">Terms of Use</a> &amp;
                        <Link to="#">Privacy Policy</Link>
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Action Now</button>
                            </div>
                        </form>


                    </div>
                    <div id="menu2" className="container table-responsive tab-pane fade "><br />
                        <table className="table table-hover table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>Gender</th>
                                    <th>Site</th>
                                    <th>Age approx</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {diagnosisList.slice(0, 1).map(
                                    record => {
                                        return (
                                            <tr className="table-danger" key={record.id}>
                                                <td><img src={"https://res.cloudinary.com/dgnzyfmdt/" + record.image_record} style={{ width: '100px', height: '100px' }} alt="" /></td>
                                                < td > {record.gender}</td>
                                                <td>{record.anatom_site_general_challenge}</td>
                                                <td>{record.age_approx}</td>
                                                <td><button className="btn btn-info my-2 my-sm-0" type="submit" onClick={() => PredictBtn(record)}>Start diagnosis </button></td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                        <h3></h3>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th colSpan="5">Your older images</th>
                                    </tr>
                                </thead>
                                <tbody className="table_my">
                                    {diagnosisList.slice(1).map(
                                        record => {
                                            return (
                                                <tr key={record.id}>
                                                    <td><img src={"https://res.cloudinary.com/dgnzyfmdt/" + record.image_record} style={{ width: '100px', height: '100px' }} alt="" /></td>
                                                    <td>{record.gender}</td>
                                                    <td>{record.anatom_site_general_challenge}</td>
                                                    <td>{record.age_approx}</td>
                                                    <td><button className="btn btn-info " style={{ width: '100px' }} type="submit" onClick={() => PredictBtn(record)}>Diagnosis </button><br />
                                                        <button className="btn btn-outline-warning mt-1 " style={{ width: '100px' }} type="submit" onClick={() => getDataToUpdateBtn(record)} data-toggle="modal" data-target="#updateDiagnosisRecordModal"  >Update</button><br />
                                                        <button className="btn btn-outline-danger mt-1" style={{ width: '100px' }} type="submit" onClick={() => DeleteBtn(record.id)}>Delete</button>

                                                    </td>
                                                </tr>

                                            )
                                        }
                                    )}
                                </tbody>
                            </table>
                            <div className="modal" id="updateDiagnosisRecordModal">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form className="m-3" onSubmit={handleSubmit(UpdateBtn)} encType="multipart/form-data">
                                            <br />
                                            <h2>Diagnosis Skin Cancer "Melanoma"</h2> <br />
                                            <p className="hint-text">Import your image and fill all input bellow. It's free and only takes a minute.</p>
                                            <div className="form-group">
                                                <input ref={register} required="required" accept="image/png, image/jpeg" name="imagerecord" type="file" onChange={e => setImageRecord(e.target.files[0])} />
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-4 col-form-label">Where does it appear?</label>
                                                {/* <input ref={register} name="anatom" type="text" className="form-control" value={anatom_site_general_challenge} onChange={e => setAnatom(e.target.value)} placeholder="Anatom Site General Challenge" required="required" /> */}
                                                <div>
                                                    <select name="anatom" ref={register} defaultValue={index_anatom}
                                                        onChange={e => setIndex_anatom(e.target.selectedIndex)}
                                                    >
                                                        <option value="Abdoben">Abdoben</option>
                                                        <option value="Back">Back</option>
                                                        <option value="Chest">Chest</option>
                                                        <option value="Ear">Ear</option>
                                                        <option value="Face">Face</option>
                                                        <option value="Foot">Foot</option>
                                                        <option value="Hand">Hand</option>
                                                        <option value="Head/Neck">Head/neck</option>
                                                        <option value="Torsor">Torsor</option>
                                                        <option value="Palms/Soles">Palms/Soles</option>
                                                        <option value="upper extremity">Upper extremity</option>
                                                        <option value="lower extremity">Lower extremity</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input ref={register} required="required" className="form-check-input" type="radio" name="GenderRadioOptions" id="Radio3" value={gender} onChange={e => setGender("Male")} />
                                                <label className="form-check-label" htmlFor="Radio3">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input ref={register} required="required" className="form-check-input" type="radio" name="GenderRadioOptions" id="Radio4" value={gender} onChange={e => setGender("Female")} />
                                                <label className="form-check-label" htmlFor="Radio4">Female</label>
                                            </div>

                                            <div className="form-group mt-3">
                                                <label className="col-sm-4 col-form-label">How old are you?</label>
                                                <input ref={register} type="number" className="form-control" name="age_approx" placeholder="Age approx" required="required" value={age_approx} onChange={e => setAgeApprox(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <button type="submit" className="btn btn-success btn-lg btn-block">Action Now</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >


        </Router >
    );
}

export default PanelDiagnosis;

