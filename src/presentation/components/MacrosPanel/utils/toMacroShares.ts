import type { IMacros } from 'shared/entities/IMacros';
import { MACRO_SHARE_STYLES } from '../constants/macroShares';
import type { IMacroShare } from '../MacrosPanelTypes';

export function toMacroShares(macros: IMacros | null): IMacroShare[] {
  if (!macros) {
    return MACRO_SHARE_STYLES.map((style) => ({ ...style, value: null, percent: 0 }));
  }

  const totalGrams = macros.carbohydrate + macros.protein + macros.fat;

  return MACRO_SHARE_STYLES.map((style) => {
    const grams = macros[style.key];
    const percent = totalGrams > 0 ? Math.round((grams / totalGrams) * 100) : 0;

    return { ...style, value: `${grams}g (${percent}%)`, percent };
  });
}
