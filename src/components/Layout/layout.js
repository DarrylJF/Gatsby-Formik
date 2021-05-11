import * as React from 'react'
import PropTypes from 'prop-types'
import './layout.css'
import Header from '../Header'
import store from '../../store'
import { Provider } from 'react-redux'

const Layout = ({ children }) => {
    return (
        <Provider store={store}>
            <div>
                <Header />
                {children}
            </div>
        </Provider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
