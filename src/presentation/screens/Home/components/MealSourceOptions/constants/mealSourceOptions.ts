import CameraIcon from 'lucide-react-native/icons/camera';
import MicIcon from 'lucide-react-native/icons/mic';
import type { IMealSourceOption } from '../MealSourceOptionsTypes';

export const MEAL_SOURCE_OPTIONS: IMealSourceOption[] = [
  {
    source: 'AUDIO',
    label: 'home.audioLabel',
    accessibilityLabel: 'home.audioAccessibility',
    icon: MicIcon
  },
  {
    source: 'PICTURE',
    label: 'home.pictureLabel',
    accessibilityLabel: 'home.pictureAccessibility',
    icon: CameraIcon
  }
];
