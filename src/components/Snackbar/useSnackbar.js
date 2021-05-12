import { useContext } from 'react'
import {
    SnackbarContext,
    defaultDuration,
    defaultPosition,
    defaultSeverity,
} from './Snackbar'
import { Color } from '@material-ui/lab'

// Custom hook to trigger the snackbar on function components
export const useSnackbar = ({ position = defaultPosition } = {}) => {
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)

    function open(
        text = '',
        severity = defaultSeverity,
        duration = defaultDuration
    ) {
        openSnackbar?.(text, severity, duration, position)
    }

    // Returns methods in hooks array way
    return [open, closeSnackbar]
}
