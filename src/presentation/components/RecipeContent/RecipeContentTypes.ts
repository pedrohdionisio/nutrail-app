import type { IRecipeContent } from 'shared/entities/IRecipeContent';

export interface IRecipeContentProps {
  recipe: IRecipeContent;
  paddingBottom: number;
}

export interface IRecipeSection {
  title: string;
  data: string[];
}
