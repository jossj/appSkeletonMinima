import { useState, useEffect } from 'react';
import { getBalance } from '../api/users';

export default function WalletSummary({ address }) {
  const [tokenCount, setTokenCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError('');
    getBalance(address)
      .then((data) => {
        const tokens = Array.isArray(data) ? data : (data?.response ?? []);
        setTokenCount(tokens.length);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <div className="wallet-summary">
      <p className="info-label">Token types at this address</p>
      {loading ? (
        <p className="balance-status">Checking&#8230;</p>
      ) : error ? (
        <p className="balance-status balance-status--error">{error}</p>
      ) : (
        <p className="token-count">{tokenCount} token type{tokenCount !== 1 ? 's' : ''}</p>
      )}
    </div>
  );
}
