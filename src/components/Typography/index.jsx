import React from 'react'
import { Typography as MuiTypography } from '@material-ui/core'
// import { useTheme } from '@material-ui/core/styles'
// import styles from './styles'

const Typography = ({ children }) => {
    // const theme = useTheme()
    return <MuiTypography>{children}</MuiTypography>
}

export default Typography
