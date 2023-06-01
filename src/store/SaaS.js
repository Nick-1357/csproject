import axios from "@/axios.js";

/* eslint-disable */
export default {

    addSaaSClient(item) {
        return new Promise((resolve, reject) => {
            axios.post('Saas-Client', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSaaSClients() {
        return new Promise((resolve, reject) => {
            axios.get('Saas-Client')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSaaSClient(SaaSId) {
        //
        return new Promise((resolve, reject) => {
            axios.get(`Saas-Client/${SaaSId}`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    ActivateSaaSClient(id) {
        return new Promise((resolve, reject) => {
            axios.post(`Saas-Client/${id}/activate`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeSaaSClient(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`Saas-Client/${id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateSaaSClient(item) {
        return new Promise((resolve, reject) => {
            axios.put(`Saas-Client/${item.id}`, item)
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