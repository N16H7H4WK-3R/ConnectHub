import React, { useState, useEffect } from 'react';
import '../components/component_css/dashboard.css';
import Contact from '../components/contacts';
import HomePage from '../components/home';
import Interactions from '../components/interactions';
import { useNavigate } from 'react-router-dom';
import { fetchProfileData } from '../config/api';
import Cookies from 'js-cookie';


function Root() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(sessionStorage.getItem('selectedTab') || 'home');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProfileData();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
        navigate('/login');
    };

    useEffect(() => {
        const token = Cookies.get('refreshToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);


    useEffect(() => {
        sessionStorage.setItem('selectedTab', selectedTab);
    }, [selectedTab]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'contacts':
                return <Contact />;
            case 'interactions':
                return <Interactions />;
            case 'home':
                return <HomePage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="body custom-styles">
            <header className="header">
                <nav className="navbar">
                    <div className="group">
                        <h3>Dashboard</h3>
                        <ul className="menu">
                            <li
                                className={`menu-item ${selectedTab === 'home' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('home')}
                            >
                                <div className="icon"><i aria-hidden="true" className="ti ti-home"></i></div><span>Home</span>
                            </li>
                            <li
                                className={`menu-item ${selectedTab === 'contacts' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('contacts')}
                            >
                                <div className="icon"><i aria-hidden="true" className="ti ti-user"></i></div><span>Contacts</span>
                            </li>
                            <li
                                className={`menu-item ${selectedTab === 'interactions' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('interactions')}
                            >
                                <div className="icon"><i aria-hidden="true" className="ti ti-file"></i></div><span>Interactions</span>
                            </li>
                            <li
                                className={`menu-item`}
                                onClick={handleLogout}
                            >
                                <div className="icon"><i aria-hidden="true" className="ti ti-settings-filled"></i></div><span>Log out</span>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="user">
                    <div className="avatar"></div>
                    <div className="info">
                        <span className="name">{data.first_name + ' ' + data.last_name}</span>
                    </div>
                </div>
            </header>
            <div className="body-section">
                {renderContent()}
            </div>
        </div>
    );
}

export default Root;
