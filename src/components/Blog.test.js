import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('testing Blog component', () => {
    let component;
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
    let likeEvent;

    beforeEach(() => {
        setBlogs = jest.fn();
        notifyUser = jest.fn();
        likeEvent = jest.fn();

        component = render(
            <Blog setBlogs={setBlogs} blogs={[]} blog={blog} notifyUser={notifyUser} like={likeEvent} />
        );
    });

    test('renders title and author', () => {
        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);
        expect(component.container).not.toHaveTextContent(blog.likes);
        expect(component.container).not.toHaveTextContent(blog.url);
    });

    test('button click renders like and url', () => {
        const button = component.getByText('show');
        fireEvent.click(button);

        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);
        expect(component.container).toHaveTextContent(blog.likes);
        expect(component.container).toHaveTextContent(blog.url);
        expect(component.container).toHaveTextContent(blog.user.username);
    });

    test('like button clicked twice', () => {
        const button = component.getByText('show');
        fireEvent.click(button);

        const likeButton = component.getByText('like');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);

        expect(likeEvent.mock.calls).toHaveLength(2);
    });
});
