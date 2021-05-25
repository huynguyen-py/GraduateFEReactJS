import axiosClient from './axiosClient';


const ReportAPI = {
    create: (form_data, token) => {
        var session_url = '/articles/reports/';
        return axiosClient.post(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    getList: (token) => {
        const url = '/articles/reports/';
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },
    delete: (id, token) => {
        var session_url = `/articles/reports/${id}`;
        return axiosClient.delete(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },


}

export default ReportAPI;