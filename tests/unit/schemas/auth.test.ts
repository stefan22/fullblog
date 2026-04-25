import { describe, it, expect } from 'vitest';
import { signInSchema, signUpSchema } from '@/app/schemas/auth';

describe('signInSchema', () => {
  it('accepts valid email and password length', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'not-an-email',
      password: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 6', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password longer than 30', () => {
    const result = signInSchema.safeParse({
      email: 'user@example.com',
      password: 'a'.repeat(31),
    });
    expect(result.success).toBe(false);
  });
});

describe('signUpSchema', () => {
  it('accepts valid signup payload', () => {
    const result = signUpSchema.safeParse({
      name: 'abc',
      email: 'new@example.com',
      password: 'secret',
    });
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 3', () => {
    const result = signUpSchema.safeParse({
      name: 'ab',
      email: 'new@example.com',
      password: 'secret',
    });
    expect(result.success).toBe(false);
  });

  it('rejects name longer than 30', () => {
    const result = signUpSchema.safeParse({
      name: 'a'.repeat(31),
      email: 'new@example.com',
      password: 'secret',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = signUpSchema.safeParse({
      name: 'Valid Name',
      email: 'bad',
      password: 'secret',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 6', () => {
    const result = signUpSchema.safeParse({
      name: 'Valid Name',
      email: 'new@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password longer than 30', () => {
    const result = signUpSchema.safeParse({
      name: 'Valid Name',
      email: 'new@example.com',
      password: 'a'.repeat(31),
    });
    expect(result.success).toBe(false);
  });
});
