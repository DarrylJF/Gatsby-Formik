import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
    Button as MuiButton,
    Paper,
    Select,
    MenuItem,
    Box,
    Container,
    Grid,
} from '@material-ui/core'
import { USER_REGISTER } from '../../helpers/api'
import { makePostRequest } from '../../helpers/requests'
import { loginUser } from '../../store/user/actions'
import { useSnackbar } from '../Snackbar'
import MyTextField from '../MyTextField'
import { Link, navigate } from 'gatsby'
import { useTheme } from '@material-ui/core/styles'
import styles from './styles'

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
    const theme = useTheme()
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
        <Container css={styles(theme)}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3} className='paper'>
                        <Box p={2} className='box'>
                            <h1>Register</h1>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ values, setFieldValue, isSubmitting }) => (
                                    <Form className='flex-form'>
                                        <MyTextField
                                            name='firstName'
                                            type='text'
                                            placeholder='First Name'
                                            value={values.firstName}
                                        />

                                        <MyTextField
                                            name='lastName'
                                            type='text'
                                            placeholder='Last Name'
                                            value={values.lastName}
                                        />

                                        <MyTextField
                                            name='email'
                                            type='email'
                                            placeholder='Email'
                                            value={values.email}
                                        />

                                        <MyTextField
                                            name='password'
                                            type='password'
                                            placeholder='Password'
                                            value={values.password}
                                        />

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
                                            {phoneCodes.map(
                                                ({ name, code }) => (
                                                    <MenuItem
                                                        key={code}
                                                        value={code}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>

                                        <MuiButton
                                            type='submit'
                                            disabled={isSubmitting}
                                            variant='contained'
                                        >
                                            Create Account
                                        </MuiButton>
                                        <div className='login'>
                                            <p>Already have an account?</p>
                                            <Link to='/login'>Log in</Link>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RegisterForm
