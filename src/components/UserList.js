import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserData = ({ user, blogs }) => {
    return (
        <>
            <TableRow>
                <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell >
                <TableCell >{blogs.length}</TableCell >
            </TableRow>
        </>
    );
};

const UserList = () => {
    const blogs = useSelector(state => state.blogs);
    let grouped = {};
    blogs.forEach(blog => {
        if (!grouped[blog.user.id]) {
            grouped[blog.user.id] = {
                user: blog.user,
                blogs: [blog]
            };
        } else {
            grouped[blog.user.id].blogs.push(blog);
        }
    });
    grouped = _.toPairs(grouped);

    return (
        <div>
            <Table>
                <TableHead>
                    <tr>
                        <th>Name</th>
                        <th># blogs created</th>
                    </tr>
                </TableHead>
                <TableBody>
                    {grouped.map(obj => <UserData key={obj[0]} user={obj[1].user} blogs={obj[1].blogs} />)}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserList;