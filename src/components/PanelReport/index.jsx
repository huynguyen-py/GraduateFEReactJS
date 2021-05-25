/* eslint-disable */
import React, { useEffect, useState } from 'react';


import { Link, BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ReportAPI from '../../api/ReportAPI';
import { useForm } from 'react-hook-form';
import myPic from '../../assets/images/my_pic.jpg';

PanelReport.propTypes = {

};




function PanelReport(props) {

    const [token, setToken] = useCookies(['access_token']);
    const [reportedList, setReportedList] = useState([]);
    const [TypeRp, setTypeRp] = useState(["Nudity", "Violence", "Spam", "Hate Speech", "Terrorism", "Something Else"]);
    const [isDeleted, setisDeleted] = useState(1);
    useEffect(() => {

        const fetchListReport = async () => {
            try {
                const response = ReportAPI.getList(token['access_token'])
                    .then(resp => {
                        console.log(resp);
                        setReportedList(resp.data)
                    })

            } catch (error) {
                console.log("Failed to fetch list report", error);
            }

        }

        fetchListReport();
    }, [isDeleted,]);

    function DeleteBtn(id) {

        var answer = window.confirm("Are you sure?")
        if (answer) {
            const response = ReportAPI.delete(id, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    window.alert("Deleted !!!");
                    setisDeleted(isDeleted + 1)
                })
                .catch(error => { console.log(error) })
            // setDeleted(false);
        } else {
            window.alert("Cancel !!!");
        }
    }

    return (
        <div className="center-panel col-6"  >
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Article</th>
                        <th>Status processing</th>
                        <th>Type reprote</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table_my">
                    {reportedList.map(
                        record => {
                            return (
                                <tr key={record.id}>
                                    <td>{record.article_be_reported}</td>
                                    <td>{record.status_processing}</td>
                                    <td>{TypeRp[record.type_reported - 1]}</td>
                                    <td>{record.create_date}</td>
                                    <td>
                                        <button className="btn btn-outline-danger mt-1" style={{ width: '100px' }} type="submit" onClick={() => DeleteBtn(record.id)} >Delete</button>
                                    </td>
                                </tr>

                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PanelReport;

