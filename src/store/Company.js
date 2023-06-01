import axios from "@/axios.js";

/* eslint-disable */
export default {

    addSaaSClient(item) {
        return new Promise((resolve, reject) => {
            axios.post('companies', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSaaSClients() {
        return new Promise((resolve, reject) => {
            axios.get('companies')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSaaSClient(SaaSId) {
        //
        return new Promise((resolve, reject) => {
            axios.get(`companies/${SaaSId}`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    ActivateSaaSClient(id) {
        return new Promise((resolve, reject) => {
            axios.post(`companies/${id}/activate`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeSaaSClient(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`companies/${id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateSaaSClient(item) {
        return new Promise((resolve, reject) => {
            axios.put(`companies/${item.id}`, item)
                .then((response) => {

                    //
                    resolve(response)
                })
                .catch((error) => {

                    reject(error)
                })
        })
    },

}