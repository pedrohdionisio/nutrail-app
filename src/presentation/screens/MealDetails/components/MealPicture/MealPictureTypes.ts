export interface IMealPictureProps {
  pictureUrl: string | null;
  isLoading: boolean;
  canEdit: boolean;
  canSave: boolean;
  canDelete: boolean;
  canChangePicture: boolean;
  isChangingPicture: boolean;
  onBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onChangePicture: () => void;
}
