import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeButton = () => {
    let history = useHistory();

    function handleNavClick(event) {
        const destination = event.target.getAttribute('nav-value');
        history.push(`/${destination}`);
    }
    return (
            <button className="btn btn-info" onClick={(event) => {handleNavClick(event)}} nav-value="dashboard">Back to Dashboard</button>
    );
};

export default HomeButton;