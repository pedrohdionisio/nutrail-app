import { fireEvent, screen } from '@testing-library/react-native';

export async function pickDateTime(date: Date) {
  await fireEvent(screen.getByTestId('date-time-picker'), 'valueChange', { nativeEvent: {} }, date);
}
