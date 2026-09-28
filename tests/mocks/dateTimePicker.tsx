import { View, type ViewProps } from 'react-native';

function DateTimePicker(props: ViewProps) {
  return <View testID='date-time-picker' {...props} />;
}

export const dateTimePickerMock = {
  __esModule: true,
  default: DateTimePicker,
  DateTimePickerAndroid: { open: jest.fn() }
};
