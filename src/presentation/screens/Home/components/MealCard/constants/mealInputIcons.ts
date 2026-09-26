import type { LucideIcon } from 'lucide-react-native';
import CameraIcon from 'lucide-react-native/icons/camera';
import MicIcon from 'lucide-react-native/icons/mic';
import PenLineIcon from 'lucide-react-native/icons/pen-line';
import type { MealInputType } from 'shared/constants/meal';

export const MEAL_INPUT_ICONS: Record<MealInputType, LucideIcon> = {
  PICTURE: CameraIcon,
  AUDIO: MicIcon,
  MANUAL: PenLineIcon
};
