import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import {
    TextField,
    Button as MuiButton,
    Paper,
    Box,
    Select,
    MenuItem,
} from '@material-ui/core'
import { USER_REGISTER } from '../../helpers/api'
import { makePostRequest } from '../../helpers/requests'
import { loginUser } from '../../store/user/actions'
import { useSnackbar } from '../Snackbar'
import MyTextField from '../MyTextField'
import { navigate } from 'gatsby'

const phoneCodes = require('../../data/phone-codes.json')

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password').min(6).max(16),
    countryCode: Yup.string().required().label('Country'),
})

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // locale: { countryCode: 'GB' },
    countryCode: 'GB',
}

const RegisterForm = () => {
    const [openSnackbar] = useSnackbar()
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)
    useEffect(() => {
        if (!!user) {
            openSnackbar(
                `You have successfully registered, welcome ${user?.firstName}.`,
                'success'
            )
            navigate('/dashboard')
        }
    }, [user])

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
            console.log({ values })
            const { data } = await makePostRequest(USER_REGISTER, values)
            const {
                payload: { user: { firstName } = {} } = {},
            } = await dispatch(loginUser(data))
            console.log({ firstName })
            openSnackbar(
                `You have successfully registered, welcome ${firstName}.`,
                'success'
            )
        } catch (error) {
            // openSnackbar(error?.errorMessage ?? 'An error occurred attempting to log in.', 'error');
            console.log('An error occurred attempting to register', error)
        }
    }

    return (
        <Paper>
            <Box p={2}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div>
                                <MyTextField
                                    name='firstName'
                                    type='text'
                                    placeholder='First Name'
                                    value={values.firstName}
                                />
                            </div>
                            <div>
                                <MyTextField
                                    name='lastName'
                                    type='text'
                                    placeholder='Last Name'
                                    value={values.lastName}
                                />
                            </div>
                            <div>
                                <MyTextField
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                    value={values.email}
                                />
                            </div>
                            <div>
                                <MyTextField
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={values.password}
                                />
                            </div>
                            <div>
                                <Select
                                    name='countryCode'
                                    onChange={e =>
                                        setFieldValue(
                                            'countryCode',
                                            e.target.value
                                        )
                                    }
                                    value={values?.countryCode}
                                >
                                    {phoneCodes.map(({ name, code }) => (
                                        <MenuItem key={code} value={code}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <MuiButton
                                    type='submit'
                                    disabled={isSubmitting}
                                    variant='contained'
                                >
                                    Create Account
                                </MuiButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Paper>
    )
}

export default RegisterForm
