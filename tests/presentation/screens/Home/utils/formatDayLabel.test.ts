import { formatDayLabel } from 'presentation/screens/Home/utils/formatDayLabel';

const TODAY = new Date(2026, 8, 26, 10);

describe('formatDayLabel', () => {
  it('should call the current day today', () => {
    expect(formatDayLabel(new Date(2026, 8, 26, 23, 50), TODAY)).toBe('Hoje, 26 de setembro');
  });

  it('should call the previous day yesterday, across months', () => {
    expect(formatDayLabel(new Date(2026, 8, 30), new Date(2026, 9, 1))).toBe(
      'Ontem, 30 de setembro'
    );
  });

  it('should use the weekday for older days', () => {
    expect(formatDayLabel(new Date(2026, 8, 24), TODAY)).toBe('Quinta, 24 de setembro');
  });
});
