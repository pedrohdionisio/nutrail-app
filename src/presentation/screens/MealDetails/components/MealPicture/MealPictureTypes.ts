export interface IMealPictureProps {
  pictureUrl: string | null;
  isLoading: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canChangePicture: boolean;
  isChangingPicture: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onChangePicture: () => void;
}
