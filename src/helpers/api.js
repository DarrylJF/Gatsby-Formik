// export const API_ROUTE =
//     process.env.REACT_APP_API_URL ||
//     (process.env.LOCAL
//         ? `http://localhost:3001`
//         : process.env.STAGING
//         ? `https://staging.260438f79400.com`
//         : `https://260438f79400.com`)

export const API_ROUTE = 'https://staging.260438f79400.com'

export const USER_REGISTER = API_ROUTE + '/auth/register'
export const USER_LOGIN = API_ROUTE + '/auth/login'
export const USER_LOGIN_LEGACY = `${API_ROUTE}/auth/login/legacy`
export const USER_LOGOUT = API_ROUTE + '/auth/logout'
export const USER_REFRESH = API_ROUTE + '/auth/refresh'
export const AUTH_PASSWORD_REPLACE = API_ROUTE + '/auth/password/replace'
export const AUTH_PASSWORD_RESET = `${API_ROUTE}/auth/password/reset/request`
export const AUTH_PASSWORD_RESET_COMPLETE = `${API_ROUTE}/auth/password/reset/complete`
export const AUTH_EMAIL_VERIFY = `${API_ROUTE}/auth/email/verify`
export const AUTH_EMAIL_VERIFY_RESEND = `${API_ROUTE}/auth/email/resendVerify`
export const AUTH_EMAIL_CHANGE_REQUEST =
    API_ROUTE + '/auth/email/change/request'
export const AUTH_EMAIL_CHANGE_COMPLETE = `${API_ROUTE}/auth/email/change/complete`
export const AUTH_EMAIL_CONCIERGE_SETUP = `${API_ROUTE}/auth/email/conciergeSetup`
export const USER_PROFILE = `${API_ROUTE}/account`
export const USER_AUDIT_LOG = `${API_ROUTE}/account/auditLog`
