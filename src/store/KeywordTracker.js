import axios from "@/axios.js";

/* eslint-disable */
export default {

    fetchDomains() {
        return new Promise((resolve, reject) => {
            axios.get('nexrank-client')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchDailyKeyword(data) {
        return new Promise((resolve, response) => {
            axios.get(`nexrank-clients/${data}/keywords-daily`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchDailyKeywordDate(data) {
        return new Promise((resolve, response) => {
            axios.get(`nexrank-clients/${data.id}/keywords-daily`, {
                params: data,
            })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



    updateClient(item) {
        return new Promise((resolve, reject) => {
            axios.put(`nexrank-client/${item.id}`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    addClient(item) {
        return new Promise((resolve, reject) => {
            axios.post('nexrank-client', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeItem(itemId) {
        return new Promise((resolve, reject) => {
            axios.delete(`/nexrank-client/${itemId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchClientKeywords(keyword) {
        return new Promise((resolve, reject) => {
            axios.get('nexrank-clients/' + keyword + '/keywords')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })

    },
    fetchClient(id) {
        return new Promise((resolve, reject) => {
            axios.get('nexrank-client/' + id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })

    },

    addClientKeyword(data) {
        return new Promise((resolve, reject) => {
            axios.post('nexrank-clients/' + data.keyword_id + '/keywords', data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })

    },

    updateClientKeyword(data) {
        return new Promise((resolve, reject) => {
            axios.put(`nexrank-clients/${data.keyword_id}/keywords/${data.id}`, data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })
    },

    removeClientKeyword(data) {
        return new Promise((resolve, reject) => {
            axios.delete(`nexrank-clients/${data.id}/keywords/${data.item_id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })
    },

    fetchViewKeyword(data) {
        return new Promise((resolve, reject) => {
            axios.get(`nexrank-clients/${data.id}/keywords-view`, {
                params: data,
            })
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },

    fetchKeyword(data) {
        return new Promise((resolve, reject) => {
            axios.get(`nexrank-clients/${data.id}/keywords/${data.keyword_id}`)
                .then((response) => {
                    // //
                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })
    },

    fetchKeywordHistory(data) {
        return new Promise((resolve, reject) => {
            axios.get(`keyword-rank/${data}/histories`)
                .then((response) => {

                    // //
                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })
    },

    fetchRecommendations(data) {
        return new Promise((resolve, response) => {
            axios.get(`Clients/${data}/Recommendation-Campaign`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchRecommendation(data) {
        return new Promise((resolve, response) => {
            axios.get(`Clients/${data.client_id}/Recommendation-Campaign/${data.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateClientRecommendation(item) {
        return new Promise((resolve, reject) => {
            axios.put('Clients/' + item.client_id + '/Recommendation-Campaign/' + item.id, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeClientRecommendation(item) {
        return new Promise((resolve, reject) => {
            axios.delete('Clients/' + item.client_id + '/Recommendation-Campaign/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchTypes() {
        return new Promise((resolve, reject) => {
            axios.get('Recommendation-Campaign/types')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchInspects(item) {
        return new Promise((resolve, reject) => {
            axios.post('Recommendation-Campaign/inspect', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    postClientRecomandations(data) {
        return new Promise((resolve, reject) => {
            axios.post('Clients/' + data.client + '/Recommendation-Campaign', data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
 
}