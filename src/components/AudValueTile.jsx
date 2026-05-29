import { TOKEN_AUD_RATE } from '../config';

export default function AudValueTile({ tokens }) {
  const totalTokens = tokens.length;

  const aud = totalTokens * TOKEN_AUD_RATE;
  const formatted = aud.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });

  return (
    <div className="aud-tile">
      <p className="info-label">AUD Value</p>
      <p className="aud-value">{formatted}</p>
    </div>
  );
}
