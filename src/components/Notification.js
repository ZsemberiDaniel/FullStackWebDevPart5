import React from 'react';

const Notification = ({ errorMsg, notiMsg }) => {
    const displayErrorMsg = () => <div className='error'>{errorMsg}</div>;
    const displayNotiMsg = () => <div className='noti'>{notiMsg}</div>;

    return (
        <div>
            {errorMsg && displayErrorMsg()}
            {notiMsg && displayNotiMsg()}
        </div>
    );
};

export default Notification;
