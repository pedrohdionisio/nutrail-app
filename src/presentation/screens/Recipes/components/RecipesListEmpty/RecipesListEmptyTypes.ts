export interface IRecipesListEmptyProps {
  isLoading: boolean;
  isError: boolean;
  isRetrying: boolean;
  onRetry: () => void;
}
