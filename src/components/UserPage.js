import React, { useRef } from 'react';
import BlogList from './BlogList';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';
import blogService from './../services/blogs';

const UserPage = ({ user, blogs, setBlogs, logout, notifyUser }) => {
    const createBlogToggleRef = useRef();

    return (
        <div id="userPage">
            <h2>Dashboard</h2>
            <p>Logged in as {user.username}</p> <button type="text" onClick={logout}>Logout</button>
            <Togglable buttonLabel='Create new blog' ref={createBlogToggleRef} >
                <CreateBlog blogs={blogs} setBlogs={setBlogs} notifyUser={notifyUser} createBlogToggleRef={createBlogToggleRef} createNewBlog={blogService.create} />
            </Togglable>
            <BlogList blogs={blogs} notifyUser={notifyUser} setBlogs={setBlogs} />
        </div>
    );
};

export default UserPage;
