import { getInitials } from 'shared/utils/getInitials';

describe('getInitials', () => {
  it('should join the first letters of the first and last names', () => {
    expect(getInitials('ana maria  souza ')).toBe('AS');
  });

  it('should use a single letter for a single name', () => {
    expect(getInitials('Mateus')).toBe('M');
  });

  it('should be empty for a blank name', () => {
    expect(getInitials('  ')).toBe('');
  });
});
