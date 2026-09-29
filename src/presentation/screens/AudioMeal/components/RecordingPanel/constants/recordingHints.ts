import type { TranslationKey } from 'data/config/i18n';
import type { RecordingStep } from '../../../AudioMealTypes';

export const RECORDING_HINTS: Record<RecordingStep, TranslationKey> = {
  IDLE: 'audioMeal.hints.IDLE',
  RECORDING: 'audioMeal.hints.RECORDING',
  RECORDED: 'audioMeal.hints.RECORDED'
};
