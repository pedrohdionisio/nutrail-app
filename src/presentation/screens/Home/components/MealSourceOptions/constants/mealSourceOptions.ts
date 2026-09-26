import CameraIcon from 'lucide-react-native/icons/camera';
import MicIcon from 'lucide-react-native/icons/mic';
import type { IMealSourceOption } from '../MealSourceOptionsTypes';

export const MEAL_SOURCE_OPTIONS: IMealSourceOption[] = [
  {
    source: 'AUDIO',
    label: 'Áudio',
    accessibilityLabel: 'Cadastrar refeição por áudio',
    icon: MicIcon
  },
  {
    source: 'PICTURE',
    label: 'Foto',
    accessibilityLabel: 'Cadastrar refeição por foto',
    icon: CameraIcon
  }
];
