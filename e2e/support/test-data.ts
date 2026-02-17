export const TEST_USER = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  roles: ['user'],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
} as const;

export const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123',
} as const;

export const TEST_TOKEN = 'fake-jwt-token-for-testing';

export const INVALID_CREDENTIALS = {
  email: 'wrong@example.com',
  password: 'wrongpassword',
} as const;