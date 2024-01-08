import axios from "./axios";


const API = 'http://localhost:3000/api'

export const registerRequest =  user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

//No la uso, desde el mismo frontend hago el logout con la cookie
export const logoutRequest = user => axios.post('/logout', user)