import { Table, TableBody } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
    const blogs = useSelector(state => state.blogs);

    return (
        <div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {blogs.map(blog => <Blog blog={blog} key={blog.id} />)}
                </TableBody>
            </Table>
        </div>
    );
};

export default BlogList;