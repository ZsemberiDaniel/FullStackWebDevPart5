import React, { useState } from 'react';
import blogsService from './../services/blogs';
import NotificationType from '../NotificationType';

const Blog = ({ setBlogs, blogs, blog, notifyUser, like }) => {
    const [fullVisible, setFullVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const likePressed = async () => {
        const newBlog = { ...blog, likes: blog.likes + 1 };
        try {
            const response = await blogsService.update(newBlog);
            setBlogs(blogs.map(b => b.id === response.id ? response : b));
            notifyUser(NotificationType.MESSAGE, 'Successfully liked post!');
        } catch (exception) {
            notifyUser(NotificationType.ERROR, 'Error while liking post!');
        }
    };

    const removeBlog = async () => {
        try {
            if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`))
            {
                await blogsService.remove(blog.id);
                setBlogs(blogs.filter(b => b.id !== blog.id));
                notifyUser(NotificationType.MESSAGE, 'Successfully removed post!');
            }
        } catch (exception) {
            notifyUser(NotificationType.ERROR, 'Error while deleting post! Try logging in again!');
        }
    };

    const renderDetails = () => {
        return (
            <div>
                <p>{ blog.url }</p>
                <p>likes: <span className="likeCount">{blog.likes}</span> <button type="button" className="likeButton" onClick={() => {
                    if (like) like();
                    likePressed();
                }}>like</button> </p>
                <p>{blog.user.username}</p>
                <button type="button" onClick={removeBlog}>remove</button>
            </div>
        );
    };

    return (
        <div style={blogStyle} className="blog">
            {blog.title} {blog.author} <button className="toggleBlog" type="button" onClick={() => setFullVisible(!fullVisible)}>{fullVisible ? 'hide' : 'show'}</button>
            {fullVisible && renderDetails()}
        </div>
    );
};

export default Blog;
