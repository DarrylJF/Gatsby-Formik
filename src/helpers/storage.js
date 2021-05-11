import { isValidJSON, isValidStringify } from './common'

export function getHostname(name) {
    const prefix = `play_retail_hub`
    const environment = process.env.LOCAL
        ? 'local'
        : process.env.STAGING
        ? 'staging'
        : ''

    return `${prefix}${environment ? `_${environment}` : ''}_${name}`
}

// Cookies and localStorage
export function bakeLocalStorage(name, value) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(
            getHostname(name),
            isValidStringify(value) ? JSON.stringify(value) : value
        )
    }
}

export function readLocalStorage(name) {
    if (typeof window !== 'undefined') {
        let value = localStorage.getItem(getHostname(name))
        return typeof value === 'string' && isValidJSON(value)
            ? JSON.parse(value)
            : value
    }

    return null
}

export function deleteLocalStorage(name) {
    if (typeof window !== 'undefined') {
        return localStorage.removeItem(getHostname(name))
    }
}

export function bakeCookie(name, value, date, format = true) {
    if (typeof window !== 'undefined') {
        const expiry = !!date ? `expires=${date};` : ''
        const domain = process.env.LOCAL ? '' : `domain=pmidf-hub.com`

        document.cookie = `${
            format ? getHostname(name) : name
        }=${JSON.stringify(value)};${expiry}path=/;${domain}`
    }
}

export function readCookie(name) {
    if (typeof window !== 'undefined') {
        let value = '; ' + document.cookie
        const parts = value.split('; ' + getHostname(name) + '=')
        value =
            parts.length === 2 ? parts?.pop()?.split(';')?.shift() : undefined

        return value
            ? isValidJSON(value)
                ? JSON.parse(value)
                : value
            : undefined
    }

    return null
}

export function deleteCookie(name, format = true) {
    if (typeof window !== 'undefined') {
        document.cookie = `${
            format ? getHostname(name) : name
        }=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/`
    }
}
