import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import UserPage from './components/UserPage';
import Notification from './components/Notification';
import UserList from './components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { init } from './reducers/blog_reducer';
import { loadSavedLogin } from './reducers/user_reducer';
import { Route, Switch, useRouteMatch } from 'react-router';
import Header from './components/Header';
import UserBlogs from './components/UserBlogs';
import BlogDetailed from './components/BlogDetailed';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => dispatch(init()), []);
    useEffect(() => dispatch(loadSavedLogin()), []);

    const loggedInUser = useSelector(state => state.user);

    const userIdMatch = useRouteMatch('/users/:id');
    const userId = userIdMatch ? userIdMatch.params.id : null;

    const blogIdMatch = useRouteMatch('/blogs/:id');
    const blogId = blogIdMatch ? blogIdMatch.params.id : null;

    const loginForm = () => <LoginForm />;
    const renderLoggedIn = () => {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/blogs/:id'>
                        <BlogDetailed blogId={blogId} />
                    </Route>
                    <Route path='/users/:id'>
                        <UserBlogs userId={userId} />
                    </Route>
                    <Route path='/users'>
                        <UserList />
                    </Route>
                    <Route path='/'>
                        <UserPage />
                    </Route>
                </Switch>
            </div>
        );
    };

    return (
        <div>
            <Notification />
            {loggedInUser === null && loginForm()}
            {loggedInUser !== null && renderLoggedIn()}
        </div>
    );
};

export default App;
