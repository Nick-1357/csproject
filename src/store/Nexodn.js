import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchCompetitors() {
        return new Promise((resolve, reject) => {
            axios.get('competitors')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchCompetitorPage(state) {
        return new Promise((resolve, reject) => {
            axios.get('competitors' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    searchCompetitors(item) {
        return new Promise((resolve, reject) => {
            axios.get('competitors' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchCompetitor(item) {
        // //
        return new Promise((resolve, reject) => {
            axios.get('competitors/' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    addCompetitors(item) {
        return new Promise((resolve, reject) => {
            axios.post('competitors', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    updateCompetitors(item) {
        return new Promise((resolve, reject) => {
            axios.post(`campaigns/${item.id}`, { item })
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeItem(itemId) {
        return new Promise((resolve, reject) => {
            axios.delete(`competitors/${itemId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
}