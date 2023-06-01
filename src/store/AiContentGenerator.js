import axios from "@/axios.js";

/* eslint-disable */
export default {

    addContentCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('Nexwriter-Campaigns', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    editSubtopic(item, id) {
        return new Promise((resolve, reject) => {
            axios.post(`Nexwriter-Campaigns/${id}/update-subtopics`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchContentCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('Nexwriter-Campaigns' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchContentCamp() {
        return new Promise((resolve, reject) => {
            axios.get('Nexwriter-Campaigns')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchContentCampaign(item) {
        return new Promise((resolve, reject) => {

            axios.get('Nexwriter-Campaigns/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    deployWordpress(item, id) {
        return new Promise((resolve, reject) => {
            axios.post(`nexrank-clients/${id}/deploy-page`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateWordpress(client_id, id, item) {
        return new Promise((resolve, reject) => {
            axios.put(`nexrank-clients/${client_id}/update-page/${id}`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    removeItem(client_id, id) {
        return new Promise((resolve, reject) => {
            axios.delete(`nexrank-clients/${client_id}/delete-page/${id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    addNexArt(id, item) {
        return new Promise((resolve, reject) => {
            axios.post(`Nexwriter-Campaigns/${id}/add-nexart`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    removeNexArt(id, nexartId) {
        return new Promise((resolve, reject) => {
            axios.delete(`Nexwriter-Campaigns/${id}/delete-nexart/${nexartId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchNexArt(item) {
        return new Promise((resolve, reject) => {

            axios.get('nexart/' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`Nexwriter-Campaigns/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


}