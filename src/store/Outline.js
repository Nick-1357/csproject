import axios from "@/axios.js";

/* eslint-disable */
export default {

    addContentCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('Outline-Campaigns', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchContentCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('Outline-Campaigns' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchContentCamp() {
        return new Promise((resolve, reject) => {
            axios.get('Outline-Campaigns')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchContentCampaign(item) {
        return new Promise((resolve, reject) => {

            axios.get('Outline-Campaigns/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },






}