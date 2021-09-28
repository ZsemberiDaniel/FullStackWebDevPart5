import React, { useRef } from 'react';
import BlogList from './BlogList';
import CreateBlog from './CreateBlog';
import Togglable from './Togglable';
import { useSelector } from 'react-redux';

const UserPage = () => {
    const createBlogToggleRef = useRef();
    const blogs = useSelector(state => {
        return state.blogs;
    });

    return (
        <div id="userPage">
            <Togglable buttonLabel='Create new blog' ref={createBlogToggleRef} >
                <CreateBlog blogs={blogs} createBlogToggleRef={createBlogToggleRef} />
            </Togglable>
            <BlogList blogs={blogs} />
        </div>
    );
};

export default UserPage;
