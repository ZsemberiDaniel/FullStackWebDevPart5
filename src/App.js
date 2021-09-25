import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import UserPage from './components/UserPage';
import Notification from './components/Notification';
import NotificationType from './NotificationType';

const App = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [notiMsg, setNotiMsg] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [notiTimeout, setNotiTimeout] = useState(null);

    const setBlogsSorted = (newBlogs) => {
        const blogs = [...newBlogs];
        const compare = (b1, b2) => {
            if (b1.likes === b2.likes) return b1.id < b2.id ? 1 : -1;

            return b1.likes < b2.likes ? 1 : -1;
        };
        blogs.sort(compare);
        setBlogs(blogs);
    };

    const notifyUser = (type, msg) => {
        setErrorMsg(null); setNotiMsg(null);

        if (type === NotificationType.MESSAGE) {
            setNotiMsg(msg);
        } else if (type === NotificationType.ERROR) {
            setErrorMsg(msg);
        }

        if (notiTimeout !== null) clearTimeout(notiTimeout);
        setNotiTimeout(setTimeout(() => {
            setErrorMsg(null); setNotiMsg(null);
            setNotiTimeout(null);
        }, 3000));
    };

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogsSorted(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setLoggedInUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const login = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user));

            blogService.setToken(user.token);
            setLoggedInUser(user);
            setUsername(''); setPassword('');
            notifyUser(NotificationType.MESSAGE, 'Successfully logged in!');
        } catch (exception) {
            notifyUser(NotificationType.ERROR, 'Wrong username or password!');
        }
    };

    const logout = () => {
        window.localStorage.removeItem('loggedInBlogsUser');
        setLoggedInUser(null);
        notifyUser(NotificationType.MESSAGE, 'Successful logout!');
    };

    const loginForm = () => <LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        login={login} />;

    const userPage = () => <UserPage user={loggedInUser} blogs={blogs} setBlogs={setBlogsSorted}
        logout={logout} notifyUser={notifyUser} />;

    return (
        <div>
            <Notification errorMsg={errorMsg} notiMsg={notiMsg} />
            {loggedInUser === null && loginForm()}
            {loggedInUser !== null && userPage()}
        </div>
    );
};

export default App;
