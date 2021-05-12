import { getUserFromToken } from '../../helpers/auth'

export const loginUser = data => async dispatch => {
    try {
        const userData = await getUserFromToken({
            token: data.access_token,
            refreshToken: data.refresh_token,
        })
        const { user, token, refreshToken } = userData

        return dispatch({
            type: 'USER_LOGIN',
            payload: {
                user,
                token,
                refreshToken,
            },
        })
    } catch (error) {
        throw error
    }
}

export const logoutUser = () => ({
    type: 'USER_LOGOUT',
})

export function updateUser(data) {
    if (!data.user) {
        // update user with existing token/refresh token
        return async dispatch => {
            try {
                const { user, token, refreshToken } = await getUserFromToken({
                    token: data.token,
                    refreshToken: data.refreshToken,
                })

                return dispatch({
                    type: 'USER_UPDATE_FROM_TOKEN',
                    payload: { user, token, refreshToken },
                })
            } catch (error) {
                throw error
            }
        }
    }

    return {
        type: 'USER_UPDATE',
        payload: data,
    }
}
