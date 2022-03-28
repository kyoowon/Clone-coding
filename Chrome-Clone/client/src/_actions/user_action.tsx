import axios from 'axios'
import {LOGIN_UESR, REGISTER_UESR} from './types'

interface login {
    email : string,
    password : string
}

interface register {
    email : string,
    name : string,
    lastname : string,
    password : string,
}

export function loginUser(dataTosubmit: login) {
    const request = axios.post('/api/users/login', dataTosubmit).then((response) => response.data)

    return {
        type : LOGIN_UESR,
        payload : request
    }
}


export function registerUser(dataTosubmit: register) {
    const request = axios.post('/api/users/register', dataTosubmit).then((response) => response.data)

    return {
        type : REGISTER_UESR,
        payload : request
    }
}
