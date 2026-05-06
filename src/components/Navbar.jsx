import { useState } from 'react';
import { useTheme } from '../context/useTheme';

const Navbar = ({ navigate, currentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const isActive    = (view) => currentView === view;
  const activeClass = (view) => isActive(view) ? 'navbar-link--active' : '';

  const navLinks = [
    { view: 'dashboard',    label: 'Dashboard' },
    { view: 'pinned-study', label: '📌 Pinned'  },
    { view: 'review',       label: '🔁 Review'  },
  ];

  const handleNav = (view) => {
    navigate(view);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">

        {/* Brand */}
        <button className="navbar-brand" onClick={() => handleNav('dashboard')}>
          Class<span>Card</span>
        </button>

        {/* Desktop links — CSS-controlled, no inline display style */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <button
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`navbar-link ${activeClass(link.view)}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right slot: theme toggle + hamburger */}
        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
          </button>

          {/* Hamburger — CSS shows only ≤768px */}
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <div className="container">
          {navLinks.map(link => (
            <button
              key={link.view}
              onClick={() => handleNav(link.view)}
              className={`mobile-link${isActive(link.view) ? ' mobile-link--active' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;