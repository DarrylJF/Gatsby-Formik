import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useTheme } from '@material-ui/core/styles'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
// import { navigate } from 'gatsby'
import { logoutUser } from '../../store/user/actions'

const Header = () => {
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div css={styles(theme)}>
            <div className='root'>
                <AppBar position='static' className='main-header'>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            aria-label='menu'
                            className='menu-button'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' className='title'>
                            App
                        </Typography>
                        {!!user ? (
                            <div>
                                <IconButton
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleMenu}
                                    color='inherit'
                                >
                                    <Avatar alt='Remy Sharp' />
                                </IconButton>
                                <Menu
                                    id='menu-appbar'
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button className='button'>LOGIN</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}

export default Header
