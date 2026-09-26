import { cn } from './cn';

describe('cn', () => {
  it('should keep the font size and the text color together', () => {
    expect(cn('text-body-sm', 'text-gray-700')).toBe('text-body-sm text-gray-700');
  });

  it('should let the last font size win', () => {
    expect(cn('text-body', 'text-title-1')).toBe('text-title-1');
  });

  it('should keep the input variant of a size together with a color', () => {
    expect(cn('text-title-1-input', 'text-black-700')).toBe('text-title-1-input text-black-700');
  });

  it('should let the last text color win', () => {
    expect(cn('text-black-800', 'text-support-red')).toBe('text-support-red');
  });
});
