import React from 'react';
import './AppForm.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    parentclassname?: string;
}

const AppFormLabelInput: React.FC<Props> = (props) => {
    return (
        <div className={props.parentclassname}>
            {props.type === 'checkbox' ? (
                <>
                    <input {...props} />
                    <label htmlFor={props.id}>{props.label}</label>
                </>
            ) : (
                <>
                    <label htmlFor={props.id}>{props.label}</label>
                    <input {...props} />
                </>
            )}
        </div>
    );
};

export default AppFormLabelInput;
