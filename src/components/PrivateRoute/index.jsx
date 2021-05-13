import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from '@reach/router'
import { useSnackbar } from '../Snackbar'
import { navigate } from 'gatsby'

const PrivateRoute = ({ component: Component, ...props }) => {
    console.log('anything')
    const location = useLocation()
    const [openSnackbar] = useSnackbar()
    // Extract user and website from Redux
    const { user } = useSelector(({ user }) => ({ user }))
    useEffect(() => {
        if (!user) {
            // user isn't logging out, notify them
            if (location.pathname !== '/logout') {
                openSnackbar('You need to be logged in to view that')
            }
            if (location.pathname !== '/login') {
                navigate('/login', { state: { from: location } })
            }
            return
        }
    }, [user])
    // Checks to see if the route is marked as admin only
    if (!user) {
        // Return null to indicate to React/Gatsby we have nothing to render
        return null
    }
    return <Component location={location} user={user} {...props} />
}
export default PrivateRoute
