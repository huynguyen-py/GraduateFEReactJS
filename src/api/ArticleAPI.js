import axiosClient from "./axiosClient";

const articleAPI = {
    getAll: (token) => {
        const url = '/articles/article';
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

    get: (id, token) => {
        const url = `/articles/article/${id}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    },

    create: (form_data, token) => {
        var session_url = '/articles/article/';
        return axiosClient.post(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },

    update: (form_data, id, token) => {
        var session_url = `/articles/article/${id}/`;
        return axiosClient.put(session_url,
            form_data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        )
    },
    delete: (id, token) => {
        var session_url = `/articles/article/${id}`;
        return axiosClient.delete(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

    like: (id, token) => {
        var session_url = `/articles/like/?id_article=${id}`;
        return axiosClient.get(session_url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

    getListOfUser: (token) => {
        const url = '/articles/list_article/';
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

    getListbyCat: (id_cat, token) => {
        const url = `/articles/list_by_category/?id_cat=${id_cat}`;
        return axiosClient.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
    },

}

export default articleAPI;