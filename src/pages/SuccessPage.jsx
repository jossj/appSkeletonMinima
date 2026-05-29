import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTokenBalance } from '../api/users';
import WalletSummary from '../components/WalletSummary';

function extractTokens(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.tokens)) return data.tokens;
  if (Array.isArray(data.response)) return data.response;
  return [];
}

function getTokenName(token) {
  if (typeof token.token === 'string') return token.token;
  if (token.token?.name) return token.token.name;
  if (token.name) return token.name;
  if (token.tokenid === '0x00') return 'Minima';
  return token.tokenid ? token.tokenid.slice(0, 12) + '...' : 'Unknown';
}

function getTokenAmount(token) {
  return token.confirmed ?? token.amount ?? token.balance ?? token.total ?? '0';
}

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState('');
  const user = state?.user;

  useEffect(() => {
    if (!user?.minimaAddress) return;
    setBalanceLoading(true);
    getTokenBalance(user.minimaAddress)
      .then((data) => setTokens(extractTokens(data)))
      .catch((err) => setBalanceError(err.message))
      .finally(() => setBalanceLoading(false));
  }, [user?.minimaAddress]);

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

        <WalletSummary address={user.minimaAddress} />

        <div className="token-section">
          <p className="info-label">Token Balance</p>
          {balanceLoading ? (
            <p className="balance-status">Checking balance&#8230;</p>
          ) : balanceError ? (
            <p className="balance-status balance-status--error">Unable to load balance</p>
          ) : tokens.length === 0 ? (
            <p className="balance-status">No tokens found at this address</p>
          ) : (
            <>
              <div className="token-list">
                {tokens.map((token, i) => (
                  <div key={i} className="token-row">
                    <span className="token-name">{getTokenName(token)}</span>
                    <span className="token-amount">{getTokenAmount(token)}</span>
                  </div>
                ))}
              </div>
              <p className="token-count">
                {tokens.length} token{tokens.length !== 1 ? 's' : ''} found
              </p>
            </>
          )}
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
