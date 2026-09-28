import { type PropsWithChildren, type ReactNode, type Ref, useImperativeHandle } from 'react';
import { View } from 'react-native';

interface IMockSwipeableMethods {
  close: () => void;
  openLeft: () => void;
  openRight: () => void;
  reset: () => void;
}

interface IMockReanimatedSwipeableProps extends PropsWithChildren {
  ref?: Ref<IMockSwipeableMethods>;
  renderRightActions?: () => ReactNode;
}

function MockReanimatedSwipeable({
  ref,
  children,
  renderRightActions
}: IMockReanimatedSwipeableProps) {
  useImperativeHandle(ref, () => ({
    close: jest.fn(),
    openLeft: jest.fn(),
    openRight: jest.fn(),
    reset: jest.fn()
  }));

  return (
    <View>
      {children}
      {renderRightActions?.()}
    </View>
  );
}

export const swipeableMock = {
  __esModule: true,
  default: MockReanimatedSwipeable
};
