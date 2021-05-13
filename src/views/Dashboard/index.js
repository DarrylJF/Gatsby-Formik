import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from '../../components/PrivateRoute'
import Home from './Home'
import EditAccount from './EditAccount'

const Dashboard = () => {
    return (
        <Router>
            <PrivateRoute path='/dashboard' component={Home} />
            <PrivateRoute
                path='/dashboard/edit-account'
                component={EditAccount}
            />
        </Router>
    )
}

export default Dashboard
