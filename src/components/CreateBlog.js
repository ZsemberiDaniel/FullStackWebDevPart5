import React, { useState } from 'react';
import NotificationType from './../NotificationType';

const CreateBlog = ({ blogs, setBlogs, notifyUser, createBlogToggleRef, createNewBlog }) => {
    const [createBlog, setCreateBlog] = useState({
        title: '', author: '', url: ''
    });

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

        const promise = createNewBlog(createBlog);
        if (promise)
            promise.then(newBlog => {
                createBlogToggleRef.current.toggleVisibility();
                setBlogs(blogs.concat(newBlog));
                notifyUser(NotificationType.MESSAGE, `Blog titled ${newBlog.title} created!`);
                setCreateBlog({ title: '', author: '', url: '' });
            }).catch(exception => {
                notifyUser(NotificationType.ERROR, `Error while creating blog! ${exception.error}`);
            });
    };

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={newBlogCreated}>
                <div>
                    title: <input type="text" name="title" id="title" value={createBlog.title} onChange={setBlogTitle}/>
                </div>
                <div>
                    author: <input type="text" name="author" id="author" value={createBlog.author} onChange={setBlogAuthor}/>
                </div>
                <div>
                    url: <input type="text" name="url" id="url" value={createBlog.url} onChange={setBlogUrl}/>
                </div>
                <div>
                    <button type='submit' id="createBlogButton">Create new blog</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
