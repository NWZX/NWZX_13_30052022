import React from 'react';
import './AppForm.css';
import LabelInput from './AppFormLabelInput';

interface Props extends React.HTMLAttributes<HTMLFormElement> {}

const Form: React.FC<Props> = (props) => {
    return <form {...props}></form>;
};

export default { Form, LabelInput };
