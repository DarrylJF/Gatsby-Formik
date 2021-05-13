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
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
// import { USER_REGISTER } from '../../helpers/api'
// import { makePostRequest } from '../../helpers/requests'
// import { loginUser } from '../../store/user/actions'
import { useSnackbar } from '../Snackbar'
import MyTextField from '../MyTextField'
import { useTheme } from '@material-ui/core/styles'
import styles from './styles'
import { makePostRequest } from '../../helpers/requests'
import { USER_PROFILE } from '../../helpers/api'
import { updateUser } from '../../store/user/actions'

const phoneCodes = require('../../data/phone-codes.json')

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    // email: Yup.string().email().required().label('Email'),
    dob: Yup.string().required().label('Date of Birth'),
    description: Yup.string().required().label('Description'),
    locale: Yup.object().shape({
        countryCode: Yup.string().required().label('Country'),
    }),
})

const EditAccountForm = () => {
    const [openSnackbar] = useSnackbar()
    const dispatch = useDispatch()
    const theme = useTheme()
    const user = useSelector(({ user }) => user)
    console.log(user)
    const initialValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName ?? '',
        // email: user?.email ?? '',
        dob: user?.dob ?? '',
        description: user?.description ?? '',
        locale: { countryCode: user?.locale?.countryCode ?? 'US' },
    }
    const handleSubmit = async values => {
        try {
            console.log({ values })
            const { data } = await makePostRequest(USER_PROFILE, values)
            const {
                payload: { user: { firstName } = {} } = {},
            } = await dispatch(updateUser(data))
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
            <Paper elevation={3} className='paper'>
                <Box p={2} className='box'>
                    <h1>Edit Account</h1>
                    <Grid container justify='center'>
                        <Grid item xs={12}>
                            <p>
                                User Name:{' '}
                                <span>{`${user?.firstName} ${user?.lastName}`}</span>
                            </p>
                            <p>
                                User Email: <span>{user?.email}</span>
                            </p>
                            <p></p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <h4>Change Details</h4>
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
                                        {/*<MyTextField*/}
                                        {/*    name='email'*/}
                                        {/*    type='email'*/}
                                        {/*    placeholder='Email'*/}
                                        {/*    value={values.email}*/}
                                        {/*/>*/}
                                        <MyTextField
                                            name='dob'
                                            type='text'
                                            placeholder='Date of Birth'
                                            value={values.dob}
                                        />{' '}
                                        <MyTextField
                                            name='description'
                                            type='text'
                                            placeholder='Description'
                                            value={values.description}
                                        />
                                        <Select
                                            name='locale.countryCode'
                                            onChange={e =>
                                                setFieldValue(
                                                    'locale.countryCode',
                                                    e.target.value
                                                )
                                            }
                                            value={values?.locale?.countryCode}
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
                                            SAVE CHANGES
                                        </MuiButton>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                        <Grid item md={6}>
                            <Box p={2}></Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default EditAccountForm
