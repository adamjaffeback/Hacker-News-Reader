import React from 'react';
import './Header.css';

/**
 * Simple header layout.
 */
function Header() {
  return (
    <header className="Header">
      <h3>Hacker News Reader</h3>
    </header>
  );
}

Header.displayName = 'Header';

export {Header};
