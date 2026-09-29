import type { TranslationKey } from 'data/config/i18n';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';

export interface IRecipeContentProps {
  recipe: IRecipeContent;
  paddingBottom: number;
}

export interface IRecipeSection {
  title: TranslationKey;
  data: string[];
}
