import axios from "@/axios.js";

/* eslint-disable */
export default {

    addData(item) {
        return new Promise((resolve, reject) => {
            axios.post('cross-platform-campiagns', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchDataParams(item) {
        return new Promise((resolve, reject) => {
            axios.get('cross-platform-campiagns' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    Config() {
        return new Promise((resolve, reject) => {
            axios.get('cross-platform-campiagns-configs')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    searchClientCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('cross-platform-campiagns' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

}