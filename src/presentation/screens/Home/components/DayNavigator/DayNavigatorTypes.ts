export interface IDayNavigatorProps {
  label: string;
  canGoToNextDay: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onOpenDatePicker: () => void;
}
