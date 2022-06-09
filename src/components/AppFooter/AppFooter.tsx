import React from 'react';
import './AppFooter.css';

interface Props {}

const AppFooter: React.FC<Props> = () => {
    return (
        <footer className="footer">
            <p className="footer-text">Copyright 2020 Argent Bank</p>
        </footer>
    );
};

export default AppFooter;
