import { describe, it, expect } from 'vitest';
import { stripMarkdown } from '@/lib/markdown';

describe('stripMarkdown', () => {
  it('removes headings and emphasis', () => {
    expect(stripMarkdown('## Hello **world**')).toBe('Hello world');
  });

  it('strips link syntax', () => {
    expect(stripMarkdown('[click](https://example.com)')).toBe('click');
  });
});
