import axios from '../utils/customizeAxios'

class RoleService {
    getRolesWithPagination(page, size) {
        return axios.get(`/api/v1/roles?page=${page}?limit=${size}`)
    }
}

export default new RoleService()