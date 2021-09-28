import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notiError, notiMessage } from '../reducers/notification_reducer';
import { addComment, like } from '../reducers/blog_reducer';
import { Button, List, ListItem, ListItemText, TextField } from '@material-ui/core';

const BlogDetailed = ({ blogId }) => {
    const [newComment, setNewComment] = useState('');
    const blog = useSelector(state => state.blogs.find(b => b.id === blogId));
    const dispatch = useDispatch();

    const likePressed = async () => {
        try {
            dispatch(like(blog.id));
            dispatch(notiMessage('Successfully liked post!'));
        } catch (exception) {
            dispatch(notiError('Error while liking post!'));
        }
    };

    const addNewComment = async () => {
        try {
            dispatch(addComment(blogId, newComment));
            dispatch(notiMessage('Successfully added comment!'));
        } catch (exception) {
            dispatch(notiError('Error while adding comment!'));
        }
    };

    if (!blog) {
        return (
            <div></div>
        );
    }

    // i know this is not the best solution but I find it unnecessary for comments to have a whole object
    // on the server side. The server appends the date of the comment so it is highly
    // unlikely that the same 2 comments will be made
    const hashCode = function(s){
        return s.split('').reduce((a,b) => {a=((a<<5)-a)+b.charCodeAt(0);return a&a;}, 0);
    };

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a> <br/>
            {blog.likes} likes 👍 <Button color='primary' type='button' onClick={likePressed}>like</Button> <br/>
            added by {blog.user.username} <br />

            <TextField type='text' name='comment' value={newComment} onChange={event => setNewComment(event.target.value)} />
            <Button color='primary' type='button' onClick={addNewComment}>add comment</Button> <br />
            <List>
                {blog.comments.map(comment => <ListItem key={hashCode(comment)}><ListItemText primary={comment}/></ListItem>)}
            </List>
        </div>
    );
};

export default BlogDetailed;
