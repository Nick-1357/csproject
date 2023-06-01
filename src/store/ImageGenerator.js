import axios from "@/axios.js";

/* eslint-disable */
export default {



    addArtCampaign(item) {
        return new Promise((resolve, reject) => {
            axios.post('nexart', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    searchArtCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('nexart' + item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchArtCampaigns(item) {
        return new Promise((resolve, reject) => {
            axios.get('nexart' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchArtCamp() {
        return new Promise((resolve, reject) => {
            axios.get('nexart')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchArtCampaign(item) {
        return new Promise((resolve, reject) => {

            axios.get('nexart/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },




}