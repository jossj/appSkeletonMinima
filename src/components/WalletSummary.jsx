import { useState, useEffect } from 'react';
import { getRedTokensRemaining } from '../api/users';

export default function WalletSummary({ address }) {
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError('');
    getRedTokensRemaining(address)
      .then((data) => setRemaining(data.sendable ?? '0'))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <div className="wallet-summary">
      <p className="info-label">Remaining tokens</p>
      {loading ? (
        <p className="balance-status">Checking&#8230;</p>
      ) : error ? (
        <p className="balance-status balance-status--error">{error}</p>
      ) : (
        <p className="token-count">{remaining}</p>
      )}
    </div>
  );
}
