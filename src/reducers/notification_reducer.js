const notificationReducer = (state = {}, action) => {
    switch (action.type) {
    case 'NOTIFY':
        return {
            errorMsg: '',
            notiMsg: action.msg
        };
    case 'ERROR':
        return {
            errorMsg: '',
            notiMsg: action.msg
        };
    case 'CLEAR':
        return {
            errorMsg: '',
            notiMsg: ''
        };
    default:
        return state;
    }
};

export const clear = () => {
    return {
        type: 'CLEAR'
    };
};

let timeoutId = null;

export const notiMessage = (msg, time=2000) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            msg
        });

        if (timeoutId !== null) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch(clear());
        }, time);
    };
};

export const notiError = (msg, time=2000) => {
    return async dispatch => {
        dispatch({
            type: 'ERROR',
            msg
        });

        if (timeoutId !== null) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch(clear());
        }, time);
    };
};

export default notificationReducer;
