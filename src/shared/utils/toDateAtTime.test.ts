import { toDateAtTime } from './toDateAtTime';

describe('toDateAtTime', () => {
  it('should build the local date at the given time', () => {
    const date = toDateAtTime('2026-09-26', '08:15');

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(8);
    expect(date.getDate()).toBe(26);
    expect(date.getHours()).toBe(8);
    expect(date.getMinutes()).toBe(15);
  });
});
