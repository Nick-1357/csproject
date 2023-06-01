import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchDatas() {
        return new Promise((resolve, reject) => {
            axios.get('Metatags-Campaigns')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchDatasParam(state) {
        return new Promise((resolve, reject) => {
            axios.get('Metatags-Campaigns' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchData(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('Metatags-Campaigns/' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    addData(item) {
        return new Promise((resolve, reject) => {
            axios.post('Metatags-Campaigns', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


}