export interface IMealDetailsErrorProps {
  message: string;
  isRetrying: boolean;
  onBack: () => void;
  onRetry: () => void;
}
