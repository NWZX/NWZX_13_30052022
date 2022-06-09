import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentificate, useProfile } from 'features/user/UserSlice';
import './AppHeader.css';

interface Props {
    title: string;
    logoSrc: string;
    logoAlt?: string;
    logoHref?: string;
}

const AppHeader: React.FC<Props> = ({ title, logoSrc, logoAlt, logoHref }) => {
    const { Logout, isAuthenticated } = useAuthentificate();
    const { data: user } = useProfile();
    const navigate = useNavigate();
    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href={logoHref}>
                <img className="main-nav-logo-image" src={logoSrc} alt={logoAlt} />
                <h1 className="sr-only">{title}</h1>
            </a>
            {user && isAuthenticated ? (
                <div>
                    <a className="main-nav-item" href="/profile">
                        <i className="fa fa-user-circle"></i>
                        {user.firstName}
                    </a>
                    <a
                        className="main-nav-item"
                        href="#"
                        onClick={() => {
                            Logout();
                            navigate('/');
                        }}
                    >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
            ) : (
                <div>
                    <a className="main-nav-item" href="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                </div>
            )}
        </nav>
    );
};

export default AppHeader;
