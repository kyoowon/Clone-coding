import axios from 'axios'
import {LOGIN_UESR} from './types'
interface login {
    email : string,
    password : string
}

const loginUser = (dataTosubmit: login) => {
    const request = axios.post('/api/users/login', dataTosubmit).then((response) => response.data)

    return {
        type : LOGIN_UESR,
        payload : request
    }
}

export default loginUser
