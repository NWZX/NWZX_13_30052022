import React from 'react';
import AppBanner from '../../components/AppBanner/AppBanner';
import AppContainer from '../../components/AppContainer/AppContainer';
import AppFeature from '../../components/AppFeature/AppFeature';
import AppFooter from '../../components/AppFooter/AppFooter';
import AppHeader from '../../components/AppHeader/AppHeader';
import './Home.css';

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <div id="home">
            <AppHeader title="Argent Bank" logoSrc="./img/argentBankLogo.png" logoAlt="Argent Bank Logo" logoHref="/" />
            <AppContainer>
                <AppBanner>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </AppBanner>
                <AppFeature.Grid>
                    <AppFeature.Item
                        imgSrc="./img/icon-chat.png"
                        imgAlt="Chat Icon"
                        title="You are our #1 priority"
                        description={
                            'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
                        }
                    />
                    <AppFeature.Item
                        imgSrc="./img/icon-money.png"
                        imgAlt="Chat Icon"
                        title="More savings means higher rates"
                        description={'The more you save with us, the higher your interest rate will be!'}
                    />
                    <AppFeature.Item
                        imgSrc="./img/icon-security.png"
                        imgAlt="Chat Icon"
                        title="Security you can trust"
                        description={
                            'We use top of the line encryption to make sure your data and money is always safe.'
                        }
                    />
                </AppFeature.Grid>
            </AppContainer>
            <AppFooter />
        </div>
    );
};

export default Home;
