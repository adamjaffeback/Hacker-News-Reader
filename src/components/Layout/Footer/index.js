import React from 'react';
import './Footer.css';
import OfflineWarning from '../../OfflineWarning';
import logo from '../../../assets/doist-logo.svg';

/**
 * Footer which displays the Doist logo and a warning if we're offline.
 */
function Footer() {
  return (
    <footer className='Footer'>
      <div className='Footer-offline'>
        <OfflineWarning />
      </div>
      <div>
        <img src={logo} alt="Doist logo" />
      </div>
      <div className="Footer-right-space"></div>
    </footer>
  );
}

Footer.displayName = 'Footer';

export {Footer};
