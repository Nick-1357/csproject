
import axios from "@/axios.js";

/* eslint-disable */
export default {


    fetchRecommendations(data) {
        return new Promise((resolve, response) => {
            axios.get(`clients/${data}/website-pages`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchRecommendation(client_id, id) {
        return new Promise((resolve, response) => {
            axios.get(`clients/${client_id}/website-pages/${id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateClientRecommendation(client_id, id, item) {
        return new Promise((resolve, reject) => {
            axios.put('clients/' + client_id + '/website-pages/' + id, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeClientRecommendation(item) {
        return new Promise((resolve, reject) => {
            axios.delete('clients/' + item.client_id + '/website-pages/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    postClientRecomandations(client_id, item) {
        return new Promise((resolve, reject) => {
            axios.post('clients/' + client_id + '/website-pages', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchTypes() {
        return new Promise((resolve, reject) => {
            axios.get('Recommendation-Campaign/types')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchInspects(item) {
        return new Promise((resolve, reject) => {
            axios.post('Recommendation-Campaign/inspect', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    assignStable(data) {
        return new Promise((resolve, reject) => {
            axios.post('clients/' + data.client + '/website-pages/' + data.website_page + '/make-variant-stable/' + data.variant)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



}