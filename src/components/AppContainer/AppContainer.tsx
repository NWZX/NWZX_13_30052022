import React from 'react';
import './AppContainer.css';

interface Props {
    children?: React.ReactNode;
    dark?: boolean;
}

const AppContainer: React.FC<Props> = ({ children, dark }) => {
    return <main className={'main' + (dark ? ' bg-dark' : '')}>{children}</main>;
};

export default AppContainer;
