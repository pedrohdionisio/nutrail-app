export interface IPlanSectionView {
  title: string;
  limits: string;
  cancelAtLabel: string | null;
  actionTitle: string;
  isLoading: boolean;
}

export interface IPlanSectionProps {
  plan: IPlanSectionView;
  onPress: () => void;
}
