import {
    bakeCookie,
    bakeLocalStorage,
    deleteCookie,
    deleteLocalStorage,
    readCookie,
    readLocalStorage,
} from '../../helpers/storage'

import { addMonths, formatISO, parseISO } from 'date-fns'

export default function userReducer(state = readLocalStorage('user'), action) {
    let user
    // Check to see what type of action is being fired
    switch (action.type) {
        case 'USER_LOGIN':
            bakeCookie(
                'user_token',
                action.payload.token,
                addMonths(new Date(), 1)
            )
            bakeCookie(
                'user_refresh_token',
                action.payload.refreshToken,
                addMonths(new Date(), 1)
            )

            user = {
                ...action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                expiry: formatISO(addMonths(new Date(), 1)),
            }

            bakeLocalStorage('user', user)

            return user
        case 'USER_LOGOUT':
            deleteLocalStorage('user')
            deleteCookie('user_token')
            deleteCookie('user_refresh_token')
            return null
        // occurs when a user is logged in in a separate tab, and a request is made back in the old tab (the user still
        // appears as the old one, but the requests go through as a new one, this instead forces an update with the new
        // logged in user).
        case 'USER_UPDATE_FROM_TOKEN':
            user = {
                ...(state ?? {}),
                ...action.payload?.user,
                token: action.payload?.token ?? state?.token,
                refreshToken:
                    action.payload?.refreshToken ?? state?.refreshToken,
            }
            bakeLocalStorage('user', user)
            if (action.payload?.token) {
                bakeCookie(
                    'user_token',
                    action.payload.token,
                    addMonths(new Date(), 1)
                )
            }
            if (action.payload?.refreshToken) {
                bakeCookie(
                    'user_refresh_token',
                    action.payload.refreshToken,
                    addMonths(new Date(), 1)
                )
            }
            return user
        case 'USER_UPDATE':
            const changeToken =
                !!action.payload.token &&
                action.payload.token !== readCookie('user_token')
            const changeRefreshToken =
                !!action.payload.refreshToken &&
                action.payload.refreshToken !== readCookie('user_refresh_token')

            if (changeToken) {
                bakeCookie(
                    'user_token',
                    action.payload.token,
                    addMonths(new Date(), 1)
                )
            }

            if (changeRefreshToken) {
                bakeCookie(
                    'user_refresh_token',
                    action.payload.refreshToken,
                    addMonths(new Date(), 1)
                )
            }

            user = {
                ...(action.payload?.user ?? state?.user ?? {}),
                token: action.payload?.token ?? state?.token,
                refreshToken:
                    action?.payload?.refreshToken ?? state?.refreshToken,
                expiry:
                    changeToken || changeRefreshToken
                        ? formatISO(addMonths(new Date(), 1))
                        : state?.expiry,
            }

            bakeLocalStorage('user', user)
            return user
        default:
            // Return state by default if nothing else is met
            return state
    }
}
