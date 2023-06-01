
import axios from "@/axios.js";

/* eslint-disable */
export default {

    fetchClient(id) {
        return new Promise((resolve, reject) => {
            axios.get('nexrank-client/' + id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })

    },

    fetchTraffic(id) {
        return new Promise((resolve, reject) => {
            axios.get(`GSC/traffic_data/${id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) });
        })

    },


    Sync(data) {
        return new Promise((resolve, reject) => {
            axios.post('GSC/sync', data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    Inpsect(data) {
        return new Promise((resolve, reject) => {
            axios.post('GSC/inspect', data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    addSitemaps(item) {
        return new Promise((resolve, reject) => {
            axios.post(`GSC/sitemap/${item.id}`, item.feedpath)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchSitemaps(id) {
        return new Promise((resolve, reject) => {
            axios.get(`GSC/sitemap/${id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    viewSitemap(item) {
        return new Promise((resolve, reject) => {
            axios.post(`GSC/sitemap/${item.id}/view`, item.feedpath)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    deleteSitemap(item) {
        return new Promise((resolve, reject) => {
            axios.post(`GSC/sitemap/${item.id}/delete`, item.feedpath)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },







}