import { TOKEN_AUD_RATE } from '../config';

export default function AudValueTile({ tokens }) {
  const totalTokens = tokens.reduce((sum, t) => {
    const amt = parseFloat(t.confirmed ?? t.amount ?? t.balance ?? t.total ?? 0);
    return sum + (isNaN(amt) ? 0 : amt);
  }, 0);

  const aud = totalTokens * TOKEN_AUD_RATE;
  const formatted = aud.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });

  return (
    <div className="aud-tile">
      <p className="info-label">AUD Value</p>
      <p className="aud-value">{formatted}</p>
    </div>
  );
}
