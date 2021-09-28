import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as userLogin } from './../reducers/user_reducer';
import { notiMessage, notiError } from './../reducers/notification_reducer';
import { Button, TextField } from '@material-ui/core';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const login = async (event) => {
        event.preventDefault();

        try {
            dispatch(userLogin(username, password));
            setUsername(''); setPassword('');
            dispatch(notiMessage('Successfully logged in!'));
        } catch (exception) {
            dispatch(notiError('Wrong username or password!'));
        }
    };

    return (
        <div className='centered'>
            <h2>Login</h2>
            <form onSubmit={login}>
                <div>
                    <TextField label='Username' type='text' name='username' id="username"
                        value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <TextField label='Password' type='password' name='password' id="password"
                        value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div>
                    <Button variant='contained' color='primary' type='submit' id='login'>Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;