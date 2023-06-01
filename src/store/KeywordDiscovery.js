import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchQueries() {
        return new Promise((resolve, reject) => {
            axios.get('keywords-query')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchQueriesParam(state) {
        return new Promise((resolve, reject) => {
            axios.get('keywords-query' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchQuery(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('keywords-query/' + item.id + '?location=' + item.LocationID)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchAllLocations() {
        return new Promise((resolve, reject) => {
            axios.get('all-locations')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



    addQuery(item) {
        return new Promise((resolve, reject) => {
            axios.post('keywords-query', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`keywords-query/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



}