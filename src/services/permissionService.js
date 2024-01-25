import axios from '../utils/customizeAxios'

class PermissionService {
    getAllPermissions() {
        return axios.get('/api/v1/permissions/all')
    }
}

const permissionService = new PermissionService()

export default permissionService