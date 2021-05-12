import React from 'react'
import { Router } from '@reach/router'
import PrivateRoute from '../../components/PrivateRoute'
import Home from './Home'
const Dashboard = () => {
    return (
        <Router>
            <PrivateRoute path='/dashboard' component={Home} />
        </Router>
    )
}

export default Dashboard
