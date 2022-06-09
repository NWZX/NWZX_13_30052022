import React from 'react';
import AppContainer from 'components/AppContainer/AppContainer';
import AppFooter from 'components/AppFooter/AppFooter';
import AppForm from 'components/AppForm/AppForm';
import AppHeader from 'components/AppHeader/AppHeader';
import { useAuthentificate } from 'features/user/UserSlice';
import './Login.css';

interface Props {}

const Login: React.FC<Props> = () => {
    const { Login, Status } = useAuthentificate();
    return (
        <div id="login">
            <AppHeader title="Argent Bank" logoSrc="./img/argentBankLogo.png" logoAlt="Argent Bank Logo" logoHref="/" />
            <AppContainer dark>
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <AppForm.Form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const email = e.currentTarget.querySelector<HTMLInputElement>('input[id="email"]')?.value;
                            const password =
                                e.currentTarget.querySelector<HTMLInputElement>('input[id="password"]')?.value;
                            const remember =
                                e.currentTarget.querySelector<HTMLInputElement>('input[id="remember-me"]')?.checked;
                            if (email && password) {
                                await Login(email, password, remember);
                            }
                        }}
                    >
                        <AppForm.LabelInput parentclassname="input-wrapper" id="email" type="email" label="Email" />
                        <AppForm.LabelInput
                            parentclassname="input-wrapper"
                            id="password"
                            type="password"
                            label="Password"
                        />
                        <AppForm.LabelInput
                            parentclassname="input-remember"
                            id="remember-me"
                            type="checkbox"
                            label="Remember me"
                        />
                        {Status === 'error' ? <p className="sign-in-error">Login or password invalid !</p> : null}
                        <button className="sign-in-button">Sign In</button>
                    </AppForm.Form>
                </section>
            </AppContainer>
            <AppFooter />
        </div>
    );
};

export default Login;
