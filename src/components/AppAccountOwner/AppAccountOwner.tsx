import React, { useEffect } from 'react';
import AppForm from '../AppForm/AppForm';
import './AppAccountOwner.css';

interface PropsItem {
    firstName?: string;
    lastName?: string;

    onModeChange?: (mode: 'edit' | 'view') => void;
    onEdit?: (firstName: string, lastName: string) => void;
}

const AppAccountOwner: React.FC<PropsItem> = ({ firstName, lastName, onModeChange, onEdit }) => {
    const [editMode, setEditMode] = React.useState(false);
    const [firstNameValue, setFirstNameValue] = React.useState(firstName || '');
    const [lastNameValue, setLastNameValue] = React.useState(lastName || '');

    useEffect(() => {
        if (firstName && lastName) {
            setFirstNameValue(firstName);
            setLastNameValue(lastName);
        }

        () => {
            setFirstNameValue('');
            setLastNameValue('');
            setEditMode(false);
        };
    }, [firstName, lastName]);

    const handleModeChange = (mode: 'edit' | 'view'): void => {
        setEditMode(mode === 'edit');
        if (onModeChange) {
            onModeChange(mode);
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleModeChange('view');
        if (onEdit && (firstName !== firstNameValue || lastName != lastNameValue)) {
            onEdit(firstNameValue, lastNameValue);
        }
    };

    if (editMode) {
        return (
            <div className="header">
                <h1>Welcome back</h1>
                <AppForm.Form className="edit-mode" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="firstName"
                            type="text"
                            value={firstNameValue}
                            onChange={(e) => setFirstNameValue(e.currentTarget.value)}
                        />
                        <input
                            id="lastName"
                            type="text"
                            value={lastNameValue}
                            onChange={(e) => setLastNameValue(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button className="edit-button" type="submit" style={{ width: '100px' }}>
                            Save
                        </button>
                        <button
                            className="edit-button"
                            type="button"
                            style={{ width: '100px' }}
                            onClick={() => {
                                setFirstNameValue(firstName || '');
                                setLastNameValue(lastName || '');
                                handleModeChange('view');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </AppForm.Form>
            </div>
        );
    } else {
        return (
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {firstNameValue} {lastNameValue}!
                </h1>
                <button className="edit-button" onClick={() => handleModeChange('edit')}>
                    Edit Name
                </button>
            </div>
        );
    }
};

export default AppAccountOwner;
