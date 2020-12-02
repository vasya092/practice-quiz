import axios from "../../axios/axios";
import { AUTH_SUCCESS,AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }
        let url = "";
        if(isLogin) {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCddhBUTtNF80KZ0ujEDRmiKTZ3bX6-zPk'
        }
        else {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCddhBUTtNF80KZ0ujEDRmiKTZ3bX6-zPk'
        }
        const response = await axios.post(url, authData)
        const data = response.data
        const expirationDate = new Date(new Date().getTime()+data.expiresIn*1000)
        console.log("expirationDate", expirationDate)
        localStorage.setItem('idToken', data.idToken)
        localStorage.setItem('localId', data.localId)
        localStorage.setItem('expirationData', expirationDate)
        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(expirationDate) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationDate*1000)
    }
}
export function logout() {
    localStorage.removeItem('idToken')
    localStorage.removeItem('localId')
    localStorage.removeItem('expirationData')
    return {
        type: AUTH_LOGOUT
    }
}
export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}