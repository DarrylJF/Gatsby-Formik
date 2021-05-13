import React from 'react'
import Layout from '../../../components/Layout'
import { useSelector } from 'react-redux'
import EditAccountForm from '../../../components/EditAccountForm'

const EditAccount = () => {
    const user = useSelector(({ user }) => user)
    console.log(user)
    return (
        <Layout>
            <EditAccountForm />
        </Layout>
    )
}

export default EditAccount
