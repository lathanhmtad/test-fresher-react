import axios from '../utils/customizeAxios'

class UserService {
    login({ email, password }) {
        return axios.post('/api/v1/auth/login', {
            email,
            password
        })
    }
}

export default new UserService()