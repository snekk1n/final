import React from 'react';

import cls from "./Modal.module.scss"

const Modal = (props) => {
    const { children, ref } = props

    return (
        <div className={cls.main}>
            <div className={cls.content} ref={ref}>
                {children}
            </div>
        </div>
    );
};

export default Modal;