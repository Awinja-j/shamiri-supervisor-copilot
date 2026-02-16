// src/lib/auth.ts
import { MOCK_SUPERVISOR } from './mock-data';

export type User = {
  id: string;
  name: string;
  email: string;
};

// Simple in-memory auth (replace with real auth later)
const VALID_CREDENTIALS = {
  email: 'kamau@shamiri.org',
  password: 'demo123', // In production, this would be hashed
};

export async function signIn(email: string, password: string): Promise<User | null> {
  // Simple validation
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    return MOCK_SUPERVISOR;
  }
  return null;
}

export async function getCurrentUser(): Promise<User | null> {
  // For now, just return the mock supervisor
  // In production, this would check session/cookie
  return MOCK_SUPERVISOR;
}