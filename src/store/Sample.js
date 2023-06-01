import axios from "@/axios.js";

/* eslint-disable */
export default {

fetchAllLocations() {
    return new Promise((resolve, reject) => {
        axios.get('all-locations' )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => { reject(error) })
    })
},
}