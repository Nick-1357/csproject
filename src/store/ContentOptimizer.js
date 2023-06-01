import axios from "@/axios.js";

/* eslint-disable */
export default {
    fetchWebsites() {
        return new Promise((resolve, reject) => {
            axios.get('websiteScanner')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchWebsitesParam(state) {
        return new Promise((resolve, reject) => {
            axios.get('websiteScanner' + state)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchWebsite(item) {
        return new Promise((resolve, reject) => {
            // axios.get(`clientsCampaigns/${item.id}`)
            axios.get('websiteScanner/' + item.id + '?location=' + item.LocationID)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateWebsite(data, id, location) {
        //

        return new Promise((resolve, reject) => {
            axios.post('websiteScanner/' + id + '/' + location + '/update', data)
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



    addWebsite(item) {
        return new Promise((resolve, reject) => {
            axios.post('websiteScanner', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`websiteScanner/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

}