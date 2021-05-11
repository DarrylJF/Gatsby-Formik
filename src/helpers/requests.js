// Requests
import { isBefore, parseISO } from 'date-fns'
import store from '../store/index'
import { logoutUser, updateUser } from '../store/user/actions'
import { USER_REFRESH } from './api'
import AxiosLibrary from 'axios'

const AxiosErrorInstance = AxiosLibrary.create()
export const Axios = AxiosLibrary.create()
export const AxiosWithoutCancel = AxiosLibrary.create()
const CancelToken = AxiosLibrary.CancelToken
let cancel

export const requestCancelled = error => AxiosLibrary.isCancel(error)

export const makeGetRequest = async (
    url,
    params,
    config,
    bypassCancel = false
) => {
    const user = store.getState().user
    const token = user?.token
    const authorization = token ? { Authorization: 'Bearer ' + token } : {}
    const request = bypassCancel ? AxiosWithoutCancel : Axios

    params = params || {}
    config = config || {}

    if (!bypassCancel) cancel?.()

    try {
        return await request.get(url, {
            params,
            headers: authorization,
            timeout: 30000,
            ...config,
        })
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled'
        throw error?.response?.data
    }
}

export const makePostRequest = async (
    url,
    data,
    params,
    config,
    bypassCancel = false
) => {
    const user = store.getState().user
    const token = user && user.token
    const authorization = token ? { Authorization: 'Bearer ' + token } : {}

    if (!bypassCancel) cancel?.()

    try {
        return await Axios.post(url, data, {
            params: params || {},
            timeout: 30000,
            ...(config || {}),
            headers: { ...authorization, ...(config?.headers ?? {}) },
        })
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled'
        throw error.response.data
    }
}

export const makePutRequest = async (
    url,
    data,
    params,
    config,
    bypassCancel = false
) => {
    const user = store.getState().user
    const token = user && user.token
    const authorization = token ? { Authorization: 'Bearer ' + token } : {}

    if (!bypassCancel) cancel?.()

    try {
        return await Axios.put(url, data, {
            params,
            headers: { ...authorization, ...config },
            timeout: 30000,
            ...config,
        })
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled'
        throw error.response.data
    }
}

export const makeDeleteRequest = async (
    url,
    data,
    params = {},
    config = {},
    bypassCancel = false
) => {
    const user = store.getState().user
    const token = user && user.token
    const authorization = token ? { Authorization: 'Bearer ' + token } : {}

    if (!bypassCancel) cancel?.()

    try {
        return await Axios.delete(url, {
            params,
            headers: { ...authorization, ...config },
            timeout: 30000,
            ...config,
        })
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled'
        throw error.response.data
    }
}

const AxiosRequestUserExpiryInterceptor = () => {
    const user = store.getState().user

    // prevent a user that no longer has a token from requesting any data (the token expired)
    if (user?.expiry && isBefore(parseISO(user.expiry), new Date())) {
        store.dispatch(logoutUser())
    }
}

Axios.interceptors.request.use(config => {
    AxiosRequestUserExpiryInterceptor()

    try {
        return { cancelToken: new CancelToken(c => (cancel = c)), ...config }
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled'
        throw error.response.data
    }
})

AxiosWithoutCancel.interceptors.request.use(config => {
    AxiosRequestUserExpiryInterceptor()
    return config
})

const AxiosResponseErrorInterceptor = error => {
    return new Promise(async function (resolve, reject) {
        try {
            if (!error.response) {
                return reject(error)
            }

            console.info(
                'Encountered an error in the Axios request. Info below'
            )

            if (
                error.response.status === 401 &&
                error.response.data &&
                error.response.data.errorName === 'FailedToAuthenticateToken'
            ) {
                const user = store.getState().user
                const refreshToken = user && user.refreshToken
                const { data: userData } = await AxiosErrorInstance.post(
                    USER_REFRESH,
                    {
                        userId: user && user._id,
                        email: user && user.email,
                    },
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                )
                const newUser = {
                    user: { ...user },
                    token: userData.access_token,
                }
                // @ts-ignore
                store.dispatch(updateUser(newUser))
                error.config.headers.Authorization = `Bearer ${userData.access_token}`
                AxiosErrorInstance(error.config).then(resolve, reject)
            } else {
                reject(error)
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Add a response interceptor
Axios.interceptors.response.use(
    response => response,
    AxiosResponseErrorInterceptor
)
AxiosWithoutCancel.interceptors.response.use(
    response => response,
    AxiosResponseErrorInterceptor
)
