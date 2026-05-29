import { useState } from 'react';
import { mintRedTokens } from '../api/users';

const MIN_VALUE = 10;
const STEP = 10;

export default function RedTokenTile({ address, onConvertSuccess }) {
  const [dollarValue, setDollarValue] = useState(MIN_VALUE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const tokenAmount = dollarValue / STEP;

  function decrement() {
    setDollarValue(v => Math.max(MIN_VALUE, v - STEP));
  }

  function increment() {
    setDollarValue(v => v + STEP);
  }

  async function handleConvert() {
    if (!address) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await mintRedTokens(address, tokenAmount);
      setResult(data);
      if (onConvertSuccess) onConvertSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="red-token-tile">
      <p className="info-label">Convert to Red Tokens</p>
      <div className="red-token-stepper">
        <button
          className="stepper-btn"
          onClick={decrement}
          disabled={dollarValue <= MIN_VALUE || loading}
          aria-label="Decrease value"
        >
          −
        </button>
        <span className="stepper-value">${dollarValue}</span>
        <button
          className="stepper-btn"
          onClick={increment}
          disabled={loading}
          aria-label="Increase value"
        >
          +
        </button>
      </div>
      <p className="red-token-hint">
        = {tokenAmount} redToken{tokenAmount !== 1 ? 's' : ''}
      </p>
      <button
        className="btn btn-primary full-width"
        onClick={handleConvert}
        disabled={loading || !address}
      >
        {loading ? 'Converting…' : 'Convert'}
      </button>
      {result && (
        <p className="red-token-success">Tokens sent to your address!</p>
      )}
      {error && (
        <p className="balance-status balance-status--error">{error}</p>
      )}
    </div>
  );
}
