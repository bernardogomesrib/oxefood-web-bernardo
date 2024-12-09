import axios from 'axios';

export const TOKEN_SESSION_ATTRIBUTE_NAME = 'token'
export const EXPIRATION_SESSION_ATTRIBUTE_NAME = 'expiration'

export const registerSuccessfulLoginForJwt = (token, expiration) => {

   localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token)
   localStorage.setItem(EXPIRATION_SESSION_ATTRIBUTE_NAME, expiration)

   setupAxiosInterceptors()
}

export const setupAxiosInterceptors = () => {

   let token = createJWTToken(localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME))

   if (isUserLoggedIn()) {
       axios.defaults.headers.common['Authorization'] = token;
   } else {
       delete axios.defaults.headers.common['Authorization'];
   }
}

export const createJWTToken = (token) => {
   return 'Bearer ' + token
}
export const logout = () => {

    localStorage.clear()
    delete axios.defaults.headers.common['Authorization'];
 }
 
 export const isTokenExpired = () => {
 
    let expiration = localStorage.getItem(EXPIRATION_SESSION_ATTRIBUTE_NAME)
    return expiration === null || expiration < new Date().getTime()
 }
 
 export const isUserLoggedIn = () => {
 
    let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
 
    if (user === null) {
        return false
    }  else {
        return true
    }
 }
 
 export const getToken = () => {
 
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
    if (token === null) return ''
    return token
 }
 