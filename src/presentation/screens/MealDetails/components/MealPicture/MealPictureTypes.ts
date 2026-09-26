export interface IMealPictureProps {
  pictureUrl: string | null;
  isLoading: boolean;
  canEdit: boolean;
  onBack: () => void;
  onEdit: () => void;
}
