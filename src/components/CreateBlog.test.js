import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from './CreateBlog';

describe('create blog form', () => {
    const blog  = {
        title: 'Blog title',
        author: 'Blog author',
        likes: 9,
        url: 'Blog url',
        user: {
            username: 'daniel'
        }
    };

    let setBlogs;
    let notifyUser;
    let createNewBlog;

    let component;

    beforeEach(() => {
        setBlogs = jest.fn();
        notifyUser = jest.fn();
        createNewBlog = jest.fn();

        component = render(<CreateBlog blogs={[]} setBlogs={setBlogs} notifyUser={notifyUser}
            createBlogToggleRef={{}} createNewBlog={createNewBlog} />);
    });

    test('', () => {
        const title = component.container.querySelector('#title');
        const url = component.container.querySelector('#url');
        const author = component.container.querySelector('#author');
        const form = component.container.querySelector('form');

        fireEvent.change(title, {
            target: { value: blog.title }
        });
        fireEvent.change(url, {
            target: { value: blog.url }
        });
        fireEvent.change(author, {
            target: { value: blog.author }
        });
        fireEvent.submit(form);

        expect(createNewBlog.mock.calls).toHaveLength(1);
        expect(createNewBlog.mock.calls[0][0].title).toBe(blog.title);
        expect(createNewBlog.mock.calls[0][0].author).toBe(blog.author);
        expect(createNewBlog.mock.calls[0][0].url).toBe(blog.url);
    });
});
