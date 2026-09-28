import { formatRecordingDuration } from './formatRecordingDuration';

describe('formatRecordingDuration', () => {
  it('should show minutes and zero-padded seconds', () => {
    expect(formatRecordingDuration(0)).toBe('0:00');
    expect(formatRecordingDuration(7400)).toBe('0:07');
    expect(formatRecordingDuration(65000)).toBe('1:05');
    expect(formatRecordingDuration(600999)).toBe('10:00');
  });
});
