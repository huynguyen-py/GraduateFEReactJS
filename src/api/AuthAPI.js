import axiosClient from './axiosClient';

const articleAPI = {
    login: (em, pass) => {
        var session_url = '/users/login/';
        return axiosClient.post(session_url,
            {
                email: em,
                password: pass,
            }
        )

    },

    register: (data) => {
        var session_url = '/users/register/';
        return axiosClient.post(session_url,
            {
                username: data.username,
                password: data.password,
                first_name: "Unknown",
                last_name: "Unknown",
                email: data.email,
            }
        )

    },
    getInfo: (email, token) => {
        const url = `/users/${email}`;
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },
    update: (form_data, email, token) => {
        var session_url = `/users/${email}/`;
        return axiosClient.put(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    followOrUn: (email, token) => {
        var session_url = `/users/follow/?email_user=${email}`;
        return axiosClient.get(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },
    getTop3Author: (token) => {
        var session_url = `/users/top_author/`;
        return axiosClient.get(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

}

export default articleAPI;