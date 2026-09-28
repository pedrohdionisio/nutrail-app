export interface IRecipeDetailsFallbackProps {
  isLoading: boolean;
  message: string;
  actionTitle: string;
  isActionLoading: boolean;
  onBack: () => void;
  onAction: () => void;
}
