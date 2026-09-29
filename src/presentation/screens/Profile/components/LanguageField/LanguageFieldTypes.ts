import type { Language } from 'shared/constants/language';

export interface ILanguageFieldProps {
  language: Language;
  onSelectLanguage: (params: ISelectLanguageParams) => void;
}

export interface ISelectLanguageParams {
  language: string;
}
