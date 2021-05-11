import AxiosLibrary from 'axios'
import { USER_AVATAR } from './api'

export const isDevelopment = process.env.LOCAL || process.env.STAGING

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = isoCode => {
    if (!isoCode) return null
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
              .toUpperCase()
              .replace(/./g, char =>
                  String.fromCodePoint(char.charCodeAt(0) + 127397)
              )
        : isoCode
}

export const returnProfilePicture = user => {
    return USER_AVATAR(user?._id)
}

// capitalised the first letter of a sentence, useful for Formik form errors
export const capitalise = text => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`
}

export const requestCancelled = error => AxiosLibrary.isCancel(error)

// Common methods
export function isValidJSON(string) {
    return /^[\],:{}\s]*$/.test(
        /* eslint-disable */
        string
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                ']'
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
        /* eslint-enable */
    )
}

export const isValidStringify = value => {
    return (typeof value === 'object' && value !== null) || Array.isArray(value)
}
