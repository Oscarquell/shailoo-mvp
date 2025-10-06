import React from 'react';
import style from './ModalWindow.module.css';

const ModalWindow = ({children, setIsOpen }) => {
    return (
        <div onClick={() => setIsOpen(false)} className={style.bloor}>
            <div onClick={(e) => e.stopPropagation()} className={style.window}>
                <div className={style.header}>
                    <button>x</button>
                </div>
                <div className={style.body}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;