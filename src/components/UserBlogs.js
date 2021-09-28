import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userService from './../services/users';

const Blog = ({ blog }) => {
    return (
        <>
            <ListItem><ListItemText primary={blog.title} secondary={blog.author} /></ListItem>
        </>
    );
};

const UserBlogs = ({ userId }) => {
    const [user, setUser] = useState();
    const blogs = useSelector(state => state.blogs);

    useEffect(() => {
        userService.get(userId).then(user => {
            setUser(user);
        });
    }, []);

    if (!user) {
        return <div></div>;
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <h4>added blogs</h4>
            <List>
                {blogs.filter(b => b.user.id === userId).map(b => <Blog blog={b} key={b.id} />)}
            </List>
        </div>
    );
};

export default UserBlogs;
