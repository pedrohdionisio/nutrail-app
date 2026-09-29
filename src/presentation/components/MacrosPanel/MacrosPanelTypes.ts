import type { TranslationKey } from 'data/config/i18n';
import type { IMacros } from 'shared/entities/IMacros';

export type MacroKey = 'carbohydrate' | 'protein' | 'fat';

export interface IMacroShareStyle {
  key: MacroKey;
  label: TranslationKey;
  textClassName: string;
  barClassName: string;
}

export interface IMacroShare extends IMacroShareStyle {
  value: string | null;
  percent: number;
}

export interface IMacrosPanelProps {
  macros: IMacros | null;
}
