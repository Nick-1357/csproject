import axios from "@/axios.js";

/* eslint-disable */
export default {

    fetchEmployees() {
        return new Promise((resolve, reject) => {
            axios.get(`employees`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.get(`employees/${item.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchRoles() {
        return new Promise((resolve, reject) => {
            axios.get('roles')
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchRole(roleId) {
        return new Promise((resolve, reject) => {
            axios.get(`roles/${roleId}`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    addRole(role) {
        return new Promise((resolve, reject) => {
            axios.post('roles', role)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    removeRole(roleId) {
        return new Promise((resolve, reject) => {
            axios.delete(`roles/${roleId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    fetchPolicies() {
        return new Promise((resolve, reject) => {
            axios.get('policies')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateRole(role) {
        return new Promise((resolve, reject) => {
            axios.post(`roles/${role.id}`, { role })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    addEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.post('employees', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.put(`employees/${item.id}`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    activeClientStaff(item) {
        return new Promise((resolve, reject) => {
            axios.post(`employees/${item.id}/activate`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.delete(`employees/${item.id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    activeEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.post(`employees/${item.id}/activate`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchRoles() {
        return new Promise((resolve, reject) => {
            axios.get('roles')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchRole(roleId) {
        return new Promise((resolve, reject) => {
            axios.get(`roles/${roleId}`)
                .then((response) => {

                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchStaffRole(staffId) {
        return new Promise((resolve, reject) => {
            axios.get(`employees/${staffId}`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchPermissions() {
        return new Promise((resolve, reject) => {
            axios.get('my-permissions')
                .then((response) => {
                    // //
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    removeRole(roleId) {
        return new Promise((resolve, reject) => {
            axios.delete(`roles/${roleId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    attachRoleEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.post(`employees/${item.staffId}/attach-role/${item.roleId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    detachRoleEmployee(item) {
        return new Promise((resolve, reject) => {
            axios.post(`employees/${item.staffId}/detach-role/${item.roleId}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    attachPermissionToRole(item) {
        return new Promise((resolve, reject) => {
            axios.post(`roles/${item.roleId}/policies`, { policies: item.policies })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    disattachPermissionToRole(permissionId, roleId) {
        return new Promise((resolve, reject) => {
            axios.post(`Detach-Permission-Role/${permissionId}/${roleId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    attachPermissionToClient(roleId, permissionId) {
        return new Promise((resolve, reject) => {
            axios.post(`Attach-Role-Permission-Client/${roleId}/${permissionId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    disattachPermissionToClient(roleId, permissionId) {
        return new Promise((resolve, reject) => {
            axios.post(`Detach-Role-Permission-Client/${roleId}/${permissionId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    addRole(role) {
        return new Promise((resolve, reject) => {
            axios.post('roles', role)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    updateRole(role) {
        return new Promise((resolve, reject) => {
            axios.post(`roles/${role.id}`, { role })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchPolicies() {
        return new Promise((resolve, reject) => {
            axios.get('policies')
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchPolicy(policyId) {

        return new Promise((resolve, reject) => {

            axios.get(`policies/${policyId.id}`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    removePolicy(policyId) {
        return new Promise((resolve, reject) => {
            axios.delete(`policies/${policyId}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    addPolicy(policy) {
        return new Promise((resolve, reject) => {
            axios.post('policies', policy)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    attachPermissionToPolicy(item) {
        return new Promise((resolve, reject) => {
            axios.post(`policies/${item.policyId}/permissions`, { permissions: item.permissionId })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    attachPolicyToRole(item) {
        return new Promise((resolve, reject) => {
            axios.post(`roles/${item.roleId}/policies`, { policies: item.policies })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },


    fetchClients() {
        return new Promise((resolve, reject) => {
            axios.get(`Agent-Client`)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchClient(item) {
        return new Promise((resolve, reject) => {
            axios.get(`Agent-Client/${item.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    addClient(item) {
        return new Promise((resolve, reject) => {
            axios.post('Agent-Client', item)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    updateClient(item) {
        return new Promise((resolve, reject) => {
            axios.put(`Agent-Client/${item.id}`, item)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },

    removeClient(item) {
        return new Promise((resolve, reject) => {
            axios.delete(`Agent-Client/${item.id}`)
                .then((response) => {

                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    activeClient(item) {
        return new Promise((resolve, reject) => {
            axios.post(`Agent-Client/${item.id}/activate`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },



}