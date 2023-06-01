import axios from "@/axios.js";

/* eslint-disable */
export default {

    addSeoAutomation(item) {
        return new Promise((resolve, reject) => {
            axios.post('Seo-Automation', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSeoAutomationParams(item) {
        return new Promise((resolve, reject) => {
            axios.get('Seo-Automation' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchSeoAutomations() {
        return new Promise((resolve, reject) => {
            axios.get('Seo-Automation')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchSeoAutomation(item) {
        return new Promise((resolve, reject) => {

            axios.get('Seo-Automation/' + item.id)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    SeoDeploy(item) {
        return new Promise((resolve, reject) => {

            axios.post('Seo-Automation/' + item.id + '/deploy')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    SeoAutomationOptimize(item, id) {
        return new Promise((resolve, reject) => {
            axios.post('Seo-Automation/' + id + '/Optimize', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    SeoAutomationEssential(item, id) {
        return new Promise((resolve, reject) => {
            axios.post('Seo-Automation/' + id + '/Select-Essentials', item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    SeoAutomationParagraph(item, id) {
        return new Promise((resolve, reject) => {
            axios.post('Seo-Automation/' + id + '/Select-Paragraphs', item)
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

    fetchGetHtml(item) {
        return new Promise((resolve, reject) => {
            axios.post('Recommendation-Campaign/gethtml', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateRecommendation(item, id, elementId) {
        return new Promise((resolve, reject) => {
            axios.put(`Seo-Automation/${id}/recommendation/${elementId}`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    calcScore(item, id) {
        return new Promise((resolve, reject) => {
            axios.put(`Seo-Automation/${id}/calulateScore`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    updateUserData(item, id) {
        return new Promise((resolve, reject) => {
            axios.put(`Seo-Automation/${id}/updateUserData`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



    addGeneticAlgo(item, id) {
        return new Promise((resolve, reject) => {
            axios.post(`Seo-Automation/${id}/addGeneticAlgo`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    reasignProject(camp, client) {
        return new Promise((resolve, reject) => {
            axios.put(`Seo-Automation/${camp}/update-folder`, client)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    contentPlanner(camp, item) {
        console.log(camp, item)
        return new Promise((resolve, reject) => {
            axios.post(`Seo-Automation/${camp}/generate-content-planner-paragraphs`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },






}