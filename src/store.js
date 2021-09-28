import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notification_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blog_reducer';
import userReducer from './reducers/user_reducer';

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
});

export default createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
));
