import * as React from 'react'
import PropTypes from 'prop-types'
import './layout.css'
import Header from '../Header'
import { Box } from '@material-ui/core'

const Index = ({ children }) => {
    return (
        <div>
            <Header />
            <Box p={3}>{children}</Box>
        </div>
    )
}

Index.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Index
