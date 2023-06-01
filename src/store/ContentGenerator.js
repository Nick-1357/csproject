import axios from "@/axios.js";

/* eslint-disable */
export default {

    addContentCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('New-Content-Generation-Campaigns', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    editSubtopic(item, id) {
        return new Promise((resolve, reject) => {
            axios.post(`New-Content-Generation-Campaigns/${id}/update-subtopics`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchContentCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('New-Content-Generation-Campaigns' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchContentCamp() {
        return new Promise((resolve, reject) => {
            axios.get('New-Content-Generation-Campaigns')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchContentCampaign(item) {
        return new Promise((resolve, reject) => {

            axios.get('New-Content-Generation-Campaigns/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`New-Content-Generation-Campaigns/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },






}