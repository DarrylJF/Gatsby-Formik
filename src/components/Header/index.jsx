import React from 'react'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '../Typography'
import { useTheme } from '@material-ui/core/styles'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'gatsby'

const Header = () => {
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const theme = useTheme()
    console.log(styles(theme))
    console.log(user)

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div css={styles(theme)}>
            <div className={'root'}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            aria-label='menu'
                            className={'menu-button'}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography>Info</Typography>
                        {!!user ? (
                            <Button className={'button'} onClick={handleLogout}>
                                LOGOUT {user.firstName}
                            </Button>
                        ) : (
                            <Button className={'button'}>LOGIN</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}

export default Header
