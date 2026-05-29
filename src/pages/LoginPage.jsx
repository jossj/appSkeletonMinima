import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/users';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const users = await getUsers();
      const match = users.find(
        (u) =>
          u.username === form.username &&
          u.email === form.email
      );
      if (!match) {
        setError('No account found with those credentials.');
        return;
      }
      navigate('/success', { state: { user: match } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <button className="back-btn" onClick={() => navigate('/')}>&#8592; Back</button>
        <div className="logo">M</div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your Minima account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="switch-link">
          New to Minima?{' '}
          <span onClick={() => navigate('/register')}>Create an account</span>
        </p>
      </div>
    </div>
  );
}
