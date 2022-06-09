import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppAccount from '../../components/AppAccount/AppAccount';
import AppAccountOwner from '../../components/AppAccountOwner/AppAccountOwner';
import AppContainer from '../../components/AppContainer/AppContainer';
import AppFooter from '../../components/AppFooter/AppFooter';
import AppHeader from '../../components/AppHeader/AppHeader';
import './Dashboard.css';
import { useProfile } from '../../features/user/UserSlice';

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { data: user, updateProfile } = useProfile();
    return (
        <div id="dashboard">
            <AppHeader title="Argent Bank" logoSrc="/img/argentBankLogo.png" logoAlt="Argent Bank Logo" logoHref="/" />

            <AppContainer dark>
                <AppAccountOwner
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    onEdit={(f, l) => {
                        user && updateProfile({ ...user, firstName: f, lastName: l });
                    }}
                />
                <AppAccount.List>
                    <AppAccount.Item title="Checking" amount={1082.5} onClick={() => navigate('/profile/accounts/1')} />
                    <AppAccount.Item title="Savings" amount={2350.68} onClick={() => navigate('/profile/accounts/1')} />
                    <AppAccount.Item
                        title="Credit Card"
                        amount={3861.25}
                        onClick={() => navigate('/profile/accounts/1')}
                    />
                </AppAccount.List>
            </AppContainer>
            <AppFooter />
        </div>
    );
};

export default Dashboard;
