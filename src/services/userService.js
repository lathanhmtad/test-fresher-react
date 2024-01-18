import axios from '../utils/customizeAxios'

class UserService {
    login({ email, password }) {
        return axios.post('/api/v1/auth/login', {
            email,
            password
        })
    }

    logout(userId) {
        return axios.get(`api/v1/auth/logout/${userId}`)
    }

    getUserById(userId) {
        return axios.get(`/api/v1/users/${userId}`)
    }

    getCurrentUser() {
        return axios.get('api/v1/users/current')
    }
}

export default new UserService()