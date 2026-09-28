import { Component, type PropsWithChildren } from 'react';

interface IMockBottomSheetModalProps extends PropsWithChildren {
  stackBehavior?: 'push' | 'replace' | 'switch';
  onDismiss?: () => void;
}

interface IMockBottomSheetModalState {
  isOpen: boolean;
}

const presentedModals = new Set<MockBottomSheetModal>();

class MockBottomSheetModal extends Component<
  IMockBottomSheetModalProps,
  IMockBottomSheetModalState
> {
  override state = { isOpen: false };

  present() {
    if (this.props.stackBehavior === 'replace') {
      for (const modal of presentedModals) {
        modal.dismiss();
      }
    }

    presentedModals.add(this);
    this.setState({ isOpen: true });
  }

  dismiss() {
    if (!presentedModals.delete(this)) {
      return;
    }

    this.setState({ isOpen: false });
    this.props.onDismiss?.();
  }

  close() {
    this.dismiss();
  }

  override componentWillUnmount() {
    presentedModals.delete(this);
  }

  override render() {
    return this.state.isOpen ? this.props.children : null;
  }
}

export const bottomSheetMock = {
  ...jest.requireActual('@gorhom/bottom-sheet/mock'),
  BottomSheetModal: MockBottomSheetModal
};
