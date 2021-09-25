import React from 'react';

const LoginForm = ({ username, setUsername, password, setPassword, login }) => {

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <div>
                    username: <input type='text' name='username' id="username"
                        value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password: <input type='password' name='password' id="password"
                        value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div>
                    <button type='submit' id='login'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;