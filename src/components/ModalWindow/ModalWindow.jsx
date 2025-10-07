import React from 'react';
import style from './ModalWindow.module.css';

const ModalWindow = ({children, setIsOpened, width = 80, height = 80, marginTop }) => {
    return (
        <div onClick={() => setIsOpened(false)} className={style.bloor}>
            <div style={{width: `${width}%`, height: `${height}vh`, margin: `${marginTop} auto`}} onClick={(e) => e.stopPropagation()} className={style.window}>
                <div className={style.header}>
                    <button onClick={() => setIsOpened(false)}>x</button>
                </div>
                <div className={style.body}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;