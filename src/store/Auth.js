import axios from "@/axios.js";

/* eslint-disable */
export default {

    loginJWT(payload) {

        return new Promise((resolve, reject) => {
            axios.post('login', payload)


                .then(response => {
                    localStorage.setItem('accessToken', response.data.data.access_token)

                    //set token globally once login
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`

                    // If there's user data in response
                    if (response.data.status) { //if response true
                        // Navigate User to homepage
                        axios.get('me')
                            .then(res => {

                                localStorage.setItem('userInfo', JSON.stringify(res.data.data))
                                localStorage.setItem('permissions', JSON.stringify(res.data.data.permissions))

                                const thisUser = res.data.data

                                let role = 'editor'

                                Object.assign(thisUser, { userRole: role })

                            })
                            .catch(error => {
                                reject(error)
                            })


                        axios.get('nexrank-client')
                            .then(res => {

                                var project = []
                                res.data.data.forEach(element => {
                                    project.push({ id: element.id, name: element.name })
                                })
                                localStorage.setItem('nexrank_client', JSON.stringify(project))

                            })
                            .catch(error => {
                                reject(error)
                            })



                        axios.get('locations')
                            .then(res => {


                                let index_ca = res.data.data.findIndex(element => element.name == "www.google.ca");
                                res.data.data.splice(index_ca, 1);
                                let index_vn = res.data.data.findIndex(element => element.name == "www.google.com.vn");
                                res.data.data.splice(index_vn, 1);


                                var locations = []

                                res.data.data.forEach((element, index) => {
                                    if (element.name == "www.google.com") {
                                        locations.push(element)
                                    }
                                })


                                res.data.data.forEach((element, index) => {
                                    if (element.name != "www.google.com") {
                                        locations.push(element)
                                    }
                                })

                                localStorage.setItem('locations', JSON.stringify(locations))

                            })
                            .catch(error => {
                                reject(error)
                            })


                        // var keywordList = []
                        // for (var count = 1; count < 5; count++) {
                        //     axios.get('keywordpools?&page=' + count)
                        //         .then(res => {


                        //             res.data.data.data.forEach((element) => {

                        //                 keywordList.push(element);
                        //             });
                        //             localStorage.setItem('keyword_pool', JSON.stringify(keywordList))

                        //         })
                        //         .catch(error => {
                        //         })
                        // }





                        resolve(response)
                    } else {
                        reject({ message: 'Wrong Email or Password' })
                    }

                })
                .catch(error => { reject(error) })
        })
    },

    getMe() {

        return new Promise((resolve, reject) => {
            axios.get('me')
                .then((response) => {
                    //
                    resolve(response)

                })
                .catch((error) => { reject(error) })
        })

    },

    getDominant() {

        return new Promise((resolve, reject) => {
            axios.get('dominant-data')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },


    forgetPassword(payload) {
        return new Promise((resolve, reject) => {
            axios.post('Forgot-Password', { email: payload.email })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })



    },

    updatePassword(payload) {
        return new Promise((resolve, reject) => {
            axios.put('Update-Password', { token: payload.token, password: payload.password, password_confirmation: payload.password_confirmation })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })


    },

    destroyAccessToken() {
        // //
        return new Promise((resolve, reject) => {
            // //
            axios.post('logout', { access_token: localStorage.getItem('accessToken') })
                .then((response) => {
                    resolve(response)
                    //
                })
                .catch((error) => {
                    reject(error)
                    //
                })
        })
    },
    updateProfile(item) {
        return new Promise((resolve, reject) => {
            axios.put('Change-My-Profile', item)
                .then((response) => {

                    resolve(response)

                    axios.get('me')
                        .then(res => {

                            localStorage.setItem('userInfo', JSON.stringify(res.data.data))

                        })
                        .catch(error => {
                            reject(error)
                        })

                })
                .catch((error) => { reject(error) })
        })
    },
    changePassword(item) {
        return new Promise((resolve, reject) => {
            axios.put('Change-My-Password', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    accountRestrictions(item) {
        return new Promise((resolve, reject) => {
            axios.post(`New-Account-Restrictions`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    ConfigureAccount(item) {
        return new Promise((resolve, reject) => {
            axios.post(`Configure-New-Account`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    ConfigureGoogleAccount(item) {
        return new Promise((resolve, reject) => {
            axios.post(`Configure-Google-Account`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    ConfigureRedeemAccount(item) {
        return new Promise((resolve, reject) => {
            axios.post(`New-Account-redeem-code`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    CreateNewAccount(item) {
        return new Promise((resolve, reject) => {
            axios.post(`create-new-Account`, item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    platformSearch(item) {
        return new Promise((resolve, reject) => {
            axios.get('cross-platform-campiagns-search?keyword=' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },


    keywordsPool(data) {
        return new Promise((resolve, reject) => {
            axios.get('keywordpools?&page=' + data)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },

    addKeywordsPool(data) {
        return new Promise((resolve, reject) => {
            axios.post('keywordpools', { keyword: data })
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },


    removeKeywordsPool(item) {
        return new Promise((resolve, reject) => {
            axios.delete('keywordpools/' + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    AddFavoutite(id, item) {
        return new Promise((resolve, reject) => {
            axios.put(`cross-platform-campiagns-faviorit/${id}` + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },
    AddArchieve(id, item) {
        return new Promise((resolve, reject) => {
            axios.put(`cross-platform-campiagns-archive/${id}` + item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },

    GetFavoutites() {
        return new Promise((resolve, reject) => {
            axios.get(`cross-platform-campiagns-faviorit/`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },
    GetArchieves() {
        return new Promise((resolve, reject) => {
            axios.get(`cross-platform-campiagns-archive/`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })

    },

}