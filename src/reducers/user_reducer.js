import loginService from './../services/login';
import blogService from './../services/blogs';

const userReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGOUT':
        return null;
    case 'LOGIN':
        return action.data;
    default:
        return state;
    }
};

export const loadSavedLogin = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser');
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);

        return {
            type: 'LOGIN',
            data: user
        };
    }

    return {
        type: ''
    };
};

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password });

        window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user));

        blogService.setToken(user.token);
        dispatch({
            type: 'LOGIN',
            data: user
        });
    };
};

export const logout = () => {
    window.localStorage.removeItem('loggedInBlogsUser');
    return {
        type: 'LOGOUT'
    };
};

export default userReducer;