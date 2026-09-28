import type { RecordingStep } from '../../../AudioMealTypes';

export const RECORDING_HINTS: Record<RecordingStep, string> = {
  IDLE: 'Toque em gravar e conte o que você comeu, com as quantidades. Por exemplo: “dois ovos mexidos e uma fatia de pão integral”.',
  RECORDING: 'Gravando. Toque em parar quando terminar.',
  RECORDED: 'Ouça o áudio, se quiser, e confirme para calcular os macros.'
};
