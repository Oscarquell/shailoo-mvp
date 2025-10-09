import React from 'react';
import style from './ModalWindow.module.css';
import { motion, AnimatePresence } from "framer-motion";

const ModalWindow = ({ children, isOpened, setIsOpened, width = 80, height = 80, marginTop }) => {
    return (
        <AnimatePresence>
            {isOpened && (
                <motion.div
                    className={style.bloor}
                    onClick={() => setIsOpened(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className={style.window}
                        style={{
                            width: `${width}%`,
                            height: `${height}vh`,
                            margin: `${marginTop} auto`
                        }}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={style.header}>
                            <button onClick={() => setIsOpened(false)}>x</button>
                        </div>
                        <div className={style.body}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalWindow;
