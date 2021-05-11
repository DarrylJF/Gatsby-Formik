import { USER_LOGIN_LEGACY, USER_PROFILE, USER_REFRESH } from './api'
import { updateUser } from '../store/user/actions'
import { Axios, makePostRequest } from './requests'
import { bakeCookie, readCookie, readLocalStorage } from './storage'
import store from '../store/index'

export function getUserFromNewToken() {
    const user = readLocalStorage('user')
    const refreshToken = readCookie('user_refresh_token')
    let token = null
    return new Promise((resolve, reject) => {
        Axios.post(
            USER_REFRESH,
            { email: user.email, userId: user._id },
            { headers: { Authorization: 'Bearer ' + refreshToken } }
        )
            .then(response => {
                token = response.data.access_token
                return Axios.get(USER_PROFILE, {
                    headers: { Authorization: 'Bearer ' + token },
                })
            })
            .then(response => {
                const user = response.data

                if (!!user && !!token && !!refreshToken) {
                    // @ts-ignore
                    store.dispatch(updateUser())
                    resolve({ user, token, refreshToken })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const getUserFromToken = data => {
    let token = data?.token || readCookie('user_token')
    let refreshToken = data?.refreshToken || readCookie('user_refresh_token')

    // A token has been returned from the server, we now get user information using said token
    return new Promise((resolve, reject) => {
        Axios.get(USER_PROFILE, {
            headers: { Authorization: 'Bearer ' + token },
        })
            .then(response => {
                // Store this response data in a object and resolve it
                resolve({
                    user: response.data,
                    token,
                    refreshToken,
                })
            })
            .catch(error => {
                if (!error) reject(false)
                // errorMessage(`${error.response.status}: ${error.response.data}`);
                reject(false)
            })
    })
}
