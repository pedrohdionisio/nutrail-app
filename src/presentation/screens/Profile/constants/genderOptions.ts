import MarsIcon from 'lucide-react-native/icons/mars';
import VenusIcon from 'lucide-react-native/icons/venus';
import type { IOption } from 'presentation/components/OptionCard/OptionCardTypes';

export const GENDER_OPTIONS: IOption[] = [
  { value: 'MALE', label: 'Masculino', icon: MarsIcon },
  { value: 'FEMALE', label: 'Feminino', icon: VenusIcon }
];
