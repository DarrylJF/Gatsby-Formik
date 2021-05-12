import React, { createContext, useState } from 'react'
import {
    default as MuiSnackbar,
    // SnackbarOrigin,
} from '@material-ui/core/Snackbar'
import { Alert, Color } from '@material-ui/lab'

// Snackbar default values
export const defaultSeverity = undefined
export const defaultPosition = { vertical: 'bottom', horizontal: 'center' }
export const defaultDuration = 4000
export const defaultInterval = 250

// Context used by the hook useSnackbar() and HoC withSnackbar()
export const SnackbarContext = createContext({
    openSnackbar: () => null,
    closeSnackbar: () => null,
})

const Snackbar = ({ children }) => {
    // Current open state
    const [open, setOpen] = useState(false)
    // Current timeout ID
    const [timeoutId, setTimeoutId] = useState(null)
    // Snackbar's text
    const [text, setText] = useState('')
    // Snackbar's duration
    const [duration, setDuration] = useState(defaultDuration)
    // Snackbar's position
    const [position, setPosition] = useState(defaultPosition)

    const [severity, setSeverity] = useState(defaultSeverity)
    // // Custom styles for the snackbar itself
    // const [customStyles, setCustomStyles] = useState({});
    // // Custom styles for the close button
    // const [closeCustomStyles, setCloseCustomStyles] = useState({});

    const triggerSnackbar = (text, severity, duration, position) => {
        setText(text)
        setSeverity(severity || defaultSeverity)
        setDuration(duration || defaultDuration)
        setPosition(position || defaultPosition)
        setOpen(true)
    }

    // Manages all the snackbar's opening process
    const openSnackbar = (text, severity, duration, position) => {
        // Closes the snackbar if it is already open
        if (open) {
            setOpen(false)
            setTimeout(() => {
                triggerSnackbar(text, severity, duration, position)
            }, defaultInterval)
        } else {
            triggerSnackbar(text, severity, duration, position)
        }
    }

    // Closes the snackbar just by setting the "open" state to false
    const closeSnackbar = () => {
        setOpen(false)
    }

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}

            <MuiSnackbar
                open={open}
                autoHideDuration={duration}
                onClose={closeSnackbar}
                aria-describedby='client-snackbar'
                anchorOrigin={position}
            >
                <Alert onClose={closeSnackbar} severity={severity}>
                    {text}
                </Alert>
            </MuiSnackbar>
        </SnackbarContext.Provider>
    )
}
export default Snackbar
