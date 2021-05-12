import React from 'react'
import { Provider } from 'react-redux'
import SnackbarProvider from './src/components/Snackbar/Snackbar'
import store from './src/store'
import { CssBaseline } from '@material-ui/core'

export const wrapRootElement = ({ element }) => {
    return (
        <Provider store={store}>
            <SnackbarProvider>
                <CssBaseline />
                {element}
            </SnackbarProvider>
        </Provider>
    )
}
