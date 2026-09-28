export interface IMealPictureProps {
  pictureUrl: string | null;
  isLoading: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
