import axios from 'axios'

export const api = axios.create ({
    baseURL: 'https://postal-api.onphpid.com'
})
