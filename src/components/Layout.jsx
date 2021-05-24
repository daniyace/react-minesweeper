import React from 'react';
import Grid from './Grid';
import '../styles/layout.css';

const Layout = () => {
  window.addEventListener('beforeinstallprompt', function (e) {
    // log the platforms provided as options in an install prompt
    console.log(e.platforms); // e.g., ["web", "android", "windows"]
    e.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome); // either "accepted" or "dismissed"
    }, handleError);
  });
  const handleError = (e) => {
    console.log(e);
  };

  return (
    <div className='main'>
      <Grid />
    </div>
  );
};

export default Layout;
