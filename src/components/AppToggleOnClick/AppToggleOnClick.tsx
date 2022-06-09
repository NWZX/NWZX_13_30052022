import React, { useEffect } from 'react';

interface Props {
    icon: JSX.Element;
    children?: React.ReactNode;
    state?: boolean;
}

const AppToggleOnClick: React.FC<Props> = ({ icon, children, state }) => {
    const [isOpen, setIsOpen] = React.useState(state);
    useEffect(() => {
        setIsOpen(state);
        return () => {
            setIsOpen(false);
        };
    }, [state]);

    const newIcon = React.cloneElement<React.SVGProps<SVGSVGElement>>(icon, { onClick: () => setIsOpen(!isOpen) });
    return isOpen ? <>{children}</> : newIcon;
};

export default AppToggleOnClick;
