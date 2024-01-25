import axios from '../utils/customizeAxios'

class UserService {
    login({ email, password }) {
        return axios.post('/api/v1/auth/login', {
            email,
            password
        })
    }

    logout(userId) {
        return axios.get(`/api/v1/auth/logout/${userId}`)
    }

    getUserWithPagination(page, size) {
        return axios.get(`/api/v1/users?page=${page}&limit=${size}`)
    }

    getUserById(userId) {
        return axios.get(`/api/v1/users/${userId}`)
    }

    getCurrentUser() {
        return axios.get('api/v1/users/current')
    }

    createNewUser(formData) {
        return axios.post('/api/v1/users', formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
}

const userService = new UserService()

export default userService