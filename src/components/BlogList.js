import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, setBlogs, notifyUser }) => {
    return (
        <div>
            {blogs.map(blog => <Blog blogs={blogs} setBlogs={setBlogs} blog={blog} notifyUser={notifyUser} key={blog.id} />)}
        </div>
    );
};

export default BlogList;