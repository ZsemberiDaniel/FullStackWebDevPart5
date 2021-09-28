import { Button, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { notiError, notiMessage } from '../reducers/notification_reducer';
import { remove } from '../reducers/blog_reducer';

const Blog = ({ blog }) => {
    const dispatch = useDispatch();

    const removeBlog = async () => {
        try {
            if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`))
            {
                dispatch(remove(blog.id));
                dispatch(notiMessage('Successfully removed post!'));
            }
        } catch (exception) {
            dispatch(notiError('Error while deleting post! Try logging in again!'));
        }
    };

    return (
        <>
            <TableRow>
                <TableCell align='left'>
                    <Typography variant="h5" gutterBottom>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </Typography>
                </TableCell>
                <TableCell align='right'>
                    <Button color='secondary' onClick={removeBlog}>delete</Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Blog;
