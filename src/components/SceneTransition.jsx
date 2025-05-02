import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './SceneTransition.css';

const SceneTransition = ({ in: inProp, children }) => {
    return (
        <CSSTransition
            in={inProp}
            timeout={500}
            classNames="scene-transition"
            unmountOnExit
        >
            {children}
        </CSSTransition>
    );
};

export default SceneTransition;
