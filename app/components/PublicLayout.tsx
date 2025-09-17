import { Link } from "@remix-run/react";

interface PublicLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
};

const headerStyle = {
  background: '#ffffff',
  borderBottom: '1px solid #e1e5e9',
  padding: '1rem 0',
  position: 'sticky' as const,
  top: 0,
  zIndex: 100
};

const headerContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  textDecoration: 'none'
};

const logoH1Style = {
  margin: 0,
  color: '#1877f2',
  fontSize: '1.5rem',
  fontWeight: 700
};

const navStyle = {
  display: 'flex',
  gap: '2rem'
};

const navLinkStyle = {
  color: '#65676b',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.2s'
};

const mainStyle = {
  flex: 1,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  width: '100%'
};

const pageTitleStyle = {
  color: '#1c1e21',
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '2rem',
  textAlign: 'center' as const
};

const footerStyle = {
  background: '#f8f9fa',
  borderTop: '1px solid #e1e5e9',
  padding: '3rem 0 1rem',
  marginTop: 'auto'
};

const footerContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem'
};

const footerSectionH3Style = {
  color: '#1c1e21',
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '1rem'
};

const footerLinksStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const footerLinkStyle = {
  color: '#65676b',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.2s'
};

const footerBottomStyle = {
  maxWidth: '1200px',
  margin: '2rem auto 0',
  padding: '1rem 2rem 0',
  borderTop: '1px solid #e1e5e9',
  textAlign: 'center' as const
};

export default function PublicLayout({ children, title }: PublicLayoutProps) {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <Link to="/" style={logoStyle}>
            <h1 style={logoH1Style}>Facebook Ads Pro</h1>
          </Link>
          <nav style={navStyle}>
            <Link to="/about" style={navLinkStyle}>About</Link>
            <Link to="/contact" style={navLinkStyle}>Contact</Link>
            <Link to="/help" style={navLinkStyle}>Help</Link>
          </nav>
        </div>
      </header>
      
      <main style={mainStyle}>
        {title && <h1 style={pageTitleStyle}>{title}</h1>}
        {children}
      </main>
      
      <footer style={footerStyle}>
        <div style={footerContentStyle}>
          <div>
            <h3 style={footerSectionH3Style}>Company</h3>
            <ul style={footerLinksStyle}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/about" style={footerLinkStyle}>About Us</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={footerLinkStyle}>Contact</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/help" style={footerLinkStyle}>Help & Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={footerSectionH3Style}>Legal</h3>
            <ul style={footerLinksStyle}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/privacy-policy" style={footerLinkStyle}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/terms-of-service" style={footerLinkStyle}>Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={footerSectionH3Style}>Resources</h3>
            <ul style={footerLinksStyle}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/help" style={footerLinkStyle}>Documentation</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={footerLinkStyle}>Support</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/about" style={footerLinkStyle}>Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={footerSectionH3Style}>Connect</h3>
            <ul style={footerLinksStyle}>
              <li style={{ marginBottom: '0.5rem' }}><a href="mailto:support@fbai-app.com" style={footerLinkStyle}>Email</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="https://twitter.com/fbai_app" style={footerLinkStyle}>Twitter</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="https://linkedin.com/company/fbai-app" style={footerLinkStyle}>LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div style={footerBottomStyle}>
          <p style={{ color: '#65676b', fontSize: '0.875rem', margin: 0 }}>
            &copy; 2024 Facebook Ads Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}