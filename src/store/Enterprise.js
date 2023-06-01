import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchDatas() {
        return new Promise((resolve, reject) => {
            axios.get('indexability')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchDatasParam(state) {
        return new Promise((resolve, reject) => {
            axios.get('indexability' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    searchClientCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('indexability' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchData(item, location) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('indexability/' + item + '?location=' + location)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reIndex(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.post('indexability/' + item + '/reindex')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    crawl_automate(item, data) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.post('indexability/' + item + '/add-seo-automation', data)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    solveIssue(item, data) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.post('indexability/' + item + '/solve-dashboard-issues', data)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    addData(item) {
        return new Promise((resolve, reject) => {
            axios.post('indexability', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    pageSpeed(id, item) {
        return new Promise((resolve, reject) => {
            axios.post(`indexability/${id}/add-pagespeed-check`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    websiteOptimizer(id, item) {
        return new Promise((resolve, reject) => {
            axios.post(`indexability/${id}/add-websiteScanner`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    update_key(item, data) {
        return new Promise((resolve, reject) => {
            axios.post('indexability/' + item + '/update-key', data)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`indexability/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



}