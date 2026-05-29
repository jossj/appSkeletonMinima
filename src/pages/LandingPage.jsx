import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page landing">
      <div className="card">
        <div className="logo">M</div>
        <h1>Minima</h1>
        <p className="subtitle">Decentralized blockchain platform</p>
        <div className="button-group">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
