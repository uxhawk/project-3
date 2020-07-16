import React from 'react';
import {useHistory} from 'react-router-dom';

const HomeButton = () => {
  const history = useHistory();

  /**
   * function to route use through the application
   * @param {event} event to get the data attribute of the click target
   * used for routing
   */
  function handleNavClick(event) {
    const destination = event.target.getAttribute('nav-value');
    history.push(`/${destination}`);
  }
  return (
    <div className="mt-5 ml-5">
      <p className="p-0 m-0 dashboard-nav" onClick={(event) => {
        handleNavClick(event);
      }} nav-value="dashboard"><ion-icon name="return-up-back-outline">
        </ion-icon> Back to dashboard</p>
    </div>

  );
};

export default HomeButton;
