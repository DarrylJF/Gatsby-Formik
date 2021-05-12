import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button as MuiButton, Paper, Container, Box } from '@material-ui/core'
import { USER_LOGIN } from '../../helpers/api'
import { makePostRequest } from '../../helpers/requests'
import { loginUser } from '../../store/user/actions'
import { useSnackbar } from '../Snackbar'
import { navigate } from 'gatsby'
import MyTextField from '../MyTextField'
import { useTheme } from '@material-ui/core/styles'
import styles from './styles'

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password').min(6).max(16),
})

const LoginForm = () => {
    const [openSnackbar] = useSnackbar()
    const dispatch = useDispatch()
    const theme = useTheme()
    const user = useSelector(({ user }) => user)
    useEffect(() => {
        if (!!user) {
            openSnackbar(
                `You have successfully logged in, welcome back ${user?.firstName}.`,
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
            const { data } = await makePostRequest(USER_LOGIN, values)
            await dispatch(loginUser(data))
        } catch (error) {
            // openSnackbar(error?.errorMessage ?? 'An error occurred attempting to log in.', 'error');
            console.log('An error occurred attempting to log in', error)
        }
    }

    return (
        <Container css={styles(theme)}>
            <Paper elevation={3} className='paper'>
                <Box p={4}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, isSubmitting }) => (
                            <Form name='formik-login-demo' data-netlify={true}>
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
                                    <MuiButton
                                        type='submit'
                                        disabled={isSubmitting}
                                        variant='contained'
                                    >
                                        LOG IN
                                    </MuiButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginForm
