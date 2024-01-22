import axios from '../utils/customizeAxios'

class RoleService {
    getAllRoles() {
        return axios.get('/api/v1/roles/all')
    }

    getRolesWithPagination(page, size) {
        return axios.get(`/api/v1/roles?page=${page}&limit=${size}`)
    }

    getRoleById(roleId) {
        return axios.get(`/api/v1/roles/${roleId}`)
    }

    createRoles(data) {
        return axios.post('/api/v1/roles', data)
    }

    updateRole(roleId, data) {
        return axios.put(`/api/v1/roles/${roleId}`, data)
    }

    deleteRole(roleId) {
        return axios.delete(`/api/v1/roles/${roleId}`)
    }
}

export default new RoleService()