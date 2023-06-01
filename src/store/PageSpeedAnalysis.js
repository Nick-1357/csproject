import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchPages() {
        return new Promise((resolve, reject) => {
            axios.get('PageSpeedCheck')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchPagesParam(state) {
        return new Promise((resolve, reject) => {
            axios.get('PageSpeedCheck' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchPage(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('PageSpeedCheck/' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    addPage(item) {
        return new Promise((resolve, reject) => {
            axios.post('PageSpeedCheck', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`PageSpeedCheck/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


}