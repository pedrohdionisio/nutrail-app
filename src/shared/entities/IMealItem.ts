import type { IMacros } from './IMacros';

export interface IMealItem extends IMacros {
  name: string;
  quantity: number;
  unit: string;
}
