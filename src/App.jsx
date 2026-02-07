import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CustomerUploadPage from './pages/CustomerUploadPage';
import QRCodePage from './pages/QRCodePage';
import { Upload, LayoutDashboard, QrCode } from 'lucide-react';

const NavLinks = () => {
  const location = useLocation();

  // Don't show nav on QR page or Upload page (they are standalone)
  if (location.pathname === '/qr' || location.pathname === '/upload') return null;

  return (
    <nav style={{
      position: 'fixed',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '999px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      display: 'flex',
      gap: '2rem',
      border: '1px solid #e2e8f0',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: location.pathname === '/' ? '#0f172a' : '#64748b' }}>
        <LayoutDashboard size={20} />
        Admin
      </Link>
      <Link to="/upload" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: location.pathname === '/upload' ? '#0f172a' : '#64748b' }}>
        <Upload size={20} />
        Customer
      </Link>
      <Link to="/qr" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: location.pathname === '/qr' ? '#0f172a' : '#64748b' }}>
        <QrCode size={20} />
        QR Poster
      </Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/upload" element={<CustomerUploadPage />} />
        <Route path="/qr" element={<QRCodePage />} />
      </Routes>
      <NavLinks />
    </Router>
  );
}

export default App;
