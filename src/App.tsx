import React from 'react';
import 'App.css';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Dashboard from 'pages/Dashboard/Dashboard';
import DashboardTransaction from 'pages/DashboardTransaction/DashboardTransaction';
import AppAuthCheck from 'components/AppAuthCheck/AppAuthCheck';

const App = (): JSX.Element => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <AppAuthCheck reverse>
                            <Login />
                        </AppAuthCheck>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AppAuthCheck>
                            <Dashboard />
                        </AppAuthCheck>
                    }
                />
                <Route
                    path="/profile/accounts/:id"
                    element={
                        <AppAuthCheck>
                            <DashboardTransaction />
                        </AppAuthCheck>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
