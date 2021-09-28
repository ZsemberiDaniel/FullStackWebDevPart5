import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notiMessage } from '../reducers/notification_reducer';
import { add } from '../reducers/blog_reducer';
import { Button, TextField } from '@material-ui/core';

const CreateBlog = ({ createBlogToggleRef }) => {
    const [createBlog, setCreateBlog] = useState({
        title: '', author: '', url: ''
    });
    const dispatch = useDispatch();

    const setBlogTitle = ({ target }) => {
        const newBlog = { ...createBlog, title: target.value };
        setCreateBlog(newBlog);
    };
    const setBlogAuthor = ({ target }) => {
        const newBlog = { ...createBlog, author: target.value };
        setCreateBlog(newBlog);
    };
    const setBlogUrl = ({ target }) => {
        const newBlog = { ...createBlog, url: target.value };
        setCreateBlog(newBlog);
    };

    const newBlogCreated = (event) => {
        event.preventDefault();

        createBlogToggleRef.current.toggleVisibility();
        dispatch(add(createBlog));
        dispatch(notiMessage(`Blog titled ${createBlog.title} created!`));
        setCreateBlog({ title: '', author: '', url: '' });
    };

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={newBlogCreated}>
                <div>
                    <TextField label='Title' type="text" name="title" id="title" value={createBlog.title} onChange={setBlogTitle}/>
                </div>
                <div>
                    <TextField label='Author' type="text" name="author" id="author" value={createBlog.author} onChange={setBlogAuthor}/>
                </div>
                <div>
                    <TextField label='URL' type="text" name="url" id="url" value={createBlog.url} onChange={setBlogUrl}/>
                </div>
                <div>
                    <Button color='primary' type='submit' id="createBlogButton">Create new blog</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
