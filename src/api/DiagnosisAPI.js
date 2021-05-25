import axiosClient from './axiosClient';


const DiagnosisAPI = {
    create: (form_data, token) => {
        var session_url = '/diagnosis/';
        return axiosClient.post(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },

    update: (form_data, id, token) => {
        var session_url = `/diagnosis/${id}/`;
        return axiosClient.put(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    delete: (id, token) => {
        var session_url = `/diagnosis/${id}`;
        return axiosClient.delete(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },
    getAll: (token) => {
        const url = '/diagnosis/';
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    }
    ,
    predict: (form_data) => {
        var session_url = '/diagnosis/predict/';
        return axiosClient.post(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${form_data.token}`,
            }
        }
        )
    },

}

export default DiagnosisAPI;