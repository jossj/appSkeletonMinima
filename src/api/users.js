// Base URL: use env var for production builds; in dev the Vite proxy handles /api -> localhost:8080
const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function registerUser({ username, email }) {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function getTokenBalance(address) {
  const res = await fetch(`${BASE_URL}/api/minima/balance?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error('Failed to fetch balance');
  return res.json();
}

export async function getBalance(address) {
  const res = await fetch(`${BASE_URL}/api/minima/balance?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error('Failed to fetch balance');
  return res.json();
}

export async function getCoins(address) {
  const res = await fetch(`${BASE_URL}/api/coins?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error('Failed to fetch coins');
  return res.json();
}
