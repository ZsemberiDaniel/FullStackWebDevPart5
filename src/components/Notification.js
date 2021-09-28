import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Notification = () => {
    const errorMsg = useSelector(state => {
        // console.log(state);
        return state.notification.errorMsg;
    });
    const notiMsg = useSelector(state => {
        return state.notification.notiMsg;
    });
    const displayErrorMsg = () => <Alert severity='error'>{errorMsg}</Alert>;
    const displayNotiMsg = () => <Alert severity='success'>{notiMsg}</Alert>;

    return (
        <div>
            {errorMsg && displayErrorMsg()}
            {notiMsg && displayNotiMsg()}
        </div>
    );
};

export default Notification;
