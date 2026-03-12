import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '14px',
            color: '#0a0a0a',
          }}>S</div>
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.5px',
          }}>SPARK</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
          <Link to="/" style={{
            textDecoration: 'none',
            color: isActive('/') ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}>Home</Link>
          <Link to="/dashboard" style={{
            textDecoration: 'none',
            color: isActive('/dashboard') ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}>Dashboard</Link>
          <Link to="/chat" style={{
            textDecoration: 'none',
            color: isActive('/chat') ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}>Chat</Link>
          <Link to="/onboarding" className="btn-gold" style={{
            padding: '8px 20px',
            fontSize: '14px',
            borderRadius: '6px',
          }}>Get Started</Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }} className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '16px' }}>Home</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '16px' }}>Dashboard</Link>
          <Link to="/chat" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '16px' }}>Chat</Link>
          <Link to="/onboarding" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ textAlign: 'center', padding: '10px 20px', fontSize: '14px' }}>Get Started</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
