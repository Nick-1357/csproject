import axios from "@/axios.js";

/* eslint-disable */
export default {

    renew(payload) {
        return new Promise((resolve, reject) => {
            axios.post('renew', payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })



    },

    topUp(payload) {
        return new Promise((resolve, reject) => {
            axios.post('Topup', payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })



    },



    stripe_checkout(payload) {
        return new Promise((resolve, reject) => {
            axios.post('stripe-checkout', payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })


    },

    upgrade(payload) {
        return new Promise((resolve, reject) => {
            axios.post('upgrade', payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })


    },

    
    cancel_subscription() {
        return new Promise((resolve, reject) => {
            axios.post('cancel-subscription')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })


    },


    
    skip_trial() {
        return new Promise((resolve, reject) => {
            axios.post('skip-free-trial')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })


    },
}