import React from 'react';
import { logout as userLogout } from '../reducers/user_reducer';
import { notiMessage } from '../reducers/notification_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user);

    const logout = () => {
        dispatch(userLogout());
        dispatch(notiMessage('Successful logout!'));
    };

    const renderHeader = () => {
        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Button color='inherit' component={Link} to='/'>
                            blogs
                        </Button>
                        <Button color='inherit' component={Link} to='/users'>
                            users
                        </Button>
                        <div style={{ flex: 1 }}></div>
                        <Typography variant="h6" component="div">
                            Logged in as {user.username}
                        </Typography>
                        <Button color='inherit' onClick={logout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <h2>Dashboard</h2>
            </div>
        );
    };

    return (
        <div>
            {loggedInUser !== null && renderHeader()}
        </div>
    );
};

export default Header;