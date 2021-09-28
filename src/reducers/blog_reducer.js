import blogService from './../services/blogs';

const blogReducer = (state=[], action) => {
    let newBlogs;
    switch (action.type) {
    case 'ADD':
        newBlogs = state.concat(action.data);
        break;
    case 'UPDATE':
        newBlogs = state.map(b => b.id === action.data.id ? action.data : b);
        break;
    case 'INIT':
        newBlogs = action.data;
        break;
    case 'REMOVE':
        newBlogs = state.filter(b => b.id !== action.data);
        break;
    default:
        return state;
    }

    const blogs = [...newBlogs];
    const compare = (b1, b2) => {
        if (b1.likes === b2.likes) return b1.id < b2.id ? 1 : -1;

        return b1.likes < b2.likes ? 1 : -1;
    };
    blogs.sort(compare);
    return blogs;
};

export const add = (newBlog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(newBlog);
        dispatch({
            type: 'ADD',
            data: addedBlog
        });
    };
};

export const remove = (id) => {
    return async dispatch => {
        await blogService.remove(id);

        dispatch({
            type: 'REMOVE',
            data: id
        });
    };
};

export const like = (id) => {
    return async dispatch => {
        const oldBlog = await blogService.get(id);
        const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
        const responseBlog = await blogService.update(newBlog);

        dispatch({
            type: 'UPDATE',
            data: responseBlog
        });
    };
};

export const init = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT',
            data: blogs
        });
    };
};

export const addComment = (blogId, newComment) => {
    return async dispatch => {
        const blog = await blogService.addComment(blogId, newComment);
        dispatch({
            type: 'UPDATE',
            data: blog
        });
    };
};

export default blogReducer;