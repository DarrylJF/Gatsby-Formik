import { useField } from 'formik'
import { TextField } from '@material-ui/core'
import React from 'react'

const MyTextField = ({ placeholder, variant, label, type, ...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextField
            {...field}
            helperText={errorText}
            placeholder={placeholder}
            error={!!errorText}
            variant={variant}
            label={label}
            type={type}
        />
    )
}

export default MyTextField
