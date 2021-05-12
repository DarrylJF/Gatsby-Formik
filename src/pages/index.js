import * as React from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import { useSelector } from 'react-redux'

const IndexPage = () => {
    const user = useSelector(({ user }) => user)

    return (
        <Layout>
            {!!user ? <div>hello {user.firstName}</div> : <LoginForm />}
        </Layout>
    )
}

export default IndexPage
