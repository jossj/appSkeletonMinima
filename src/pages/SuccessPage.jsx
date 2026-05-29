import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const user = state?.user;

  if (!user) {
    navigate('/');
    return null;
  }

  function copyAddress() {
    navigator.clipboard.writeText(user.minimaAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="page">
      <div className="card success-card">
        <div className="success-icon">&#10003;</div>
        <h2>Account Ready</h2>
        <p className="subtitle">Welcome, <strong>{user.username}</strong></p>

        <div className="info-section">
          <p className="info-label">Your Minima Address</p>
          <div className="address-box">
            <span className="address-text">{user.minimaAddress}</span>
            <button
              className="copy-btn"
              onClick={copyAddress}
              title="Copy address"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
          <p className="info-hint">
            This is your unique address on the Minima blockchain. Keep it safe &#8212; others can use it to send you coins.
          </p>
        </div>

        <div className="user-details">
          <div className="detail-row">
            <span className="detail-label">Username</span>
            <span className="detail-value">{user.username}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">User ID</span>
            <span className="detail-value">#{user.id}</span>
          </div>
        </div>

        <button className="btn btn-secondary full-width" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
