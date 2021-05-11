import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { TextField, Button as MuiButton } from '@material-ui/core'
import { USER_LOGIN } from '../../helpers/api'
import { makePostRequest } from '../../helpers/requests'
import { loginUser } from '../../store/user/actions'

const MyTextField = ({ placeholder, variant, label, rows, ...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextField
            {...field}
            helperText={errorText}
            placeholder={placeholder}
            error={!!errorText}
            multiline
            variant={variant}
            label={label}
            rows={rows}
        />
    )
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password').min(6).max(16),
})

const LoginForm = () => {
    const dispatch = useDispatch()
    const encode = data => {
        return Object.keys(data)
            .map(
                key =>
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(data[key])
            )
            .join('&')
    }

    const handleSubmit = async values => {
        try {
            const { data } = await makePostRequest(USER_LOGIN, values)
            await dispatch(loginUser(data))
        } catch (error) {
            // openSnackbar(error?.errorMessage ?? 'An error occurred attempting to log in.', 'error');
            console.log('An error occurred attempting to log in', error)
        }
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
        >
            {({
                onBlur,
                onChange,
                touched,
                handleChange,
                errors,
                values,
                setFieldValue,
                isSubmitting,
            }) => (
                <Form name={'formik-login-demo'} data-netlify={true}>
                    <div>
                        <MyTextField
                            name={'email'}
                            type={'input'}
                            placeholder={'Email'}
                            value={values.email}
                        />
                    </div>
                    <div>
                        <MyTextField
                            name={'password'}
                            type={'input'}
                            placeholder={'Password'}
                            value={values.password}
                        />
                    </div>
                    <div>
                        <MuiButton type={'submit'} disabled={isSubmitting}>
                            LOG IN
                        </MuiButton>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
