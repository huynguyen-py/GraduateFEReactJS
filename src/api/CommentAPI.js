import axiosClient from './axiosClient'

//http://127.0.0.1:8000/api/articles/comments/

const commentAPI = {
    get_comment_of: (id, token) => {
        const url = `/articles/get_comment/?id_article=${id}`;
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },
    get: (id) => {
        const url = `/articles/comments/${id}`;
        return axiosClient.get(url)
    },
    create: (form_data, token) => {
        var session_url = '/articles/comments/';
        return axiosClient.post(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    update: (form_data, id, token) => {
        var session_url = `/articles/comments/${id}/`;
        return axiosClient.put(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    delete: (id, token) => {
        var session_url = `/articles/comments/${id}`;
        return axiosClient.delete(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },




}

export default commentAPI;