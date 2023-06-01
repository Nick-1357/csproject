import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchClientCampaigns() {
        return new Promise((resolve, reject) => {
            axios.get('clientsCampaigns')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchClientCampaignsPage(state) {
        return new Promise((resolve, reject) => {
            axios.get('clientsCampaigns' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    searchClientCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('clientsCampaigns' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchClientCampaign(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('clientsCampaigns/' + item.id + '?location=' + item.LocationID)
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


    fetchCampaigns() {
        return new Promise((resolve, reject) => {
            axios.get('campaigns')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    addCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('campaigns', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.post(`campaigns/${item.id}`, { item })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    addClientCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('clientsCampaigns', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateClientCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post(`clientsCampaigns/${item.id}`, { item })
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`clientsCampaigns/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

}