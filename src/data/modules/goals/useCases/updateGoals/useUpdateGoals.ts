import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoalsService } from 'data/modules/goals/services/GoalsService';
import { ME_QUERY_KEYS } from 'data/modules/me/keys/MeKeys';
import type { IMe } from 'shared/entities/IMe';
import { GOALS_MUTATION_KEYS } from '../../keys/GoalsKeys';

export function useUpdateGoals() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [GOALS_MUTATION_KEYS.UPDATE_GOALS],
    mutationFn: GoalsService.update,
    onSuccess: ({ goals }) => {
      queryClient.setQueryData<IMe>([ME_QUERY_KEYS.ME], (me) => me && { ...me, goals });
    }
  });

  return {
    updateGoals: mutateAsync,
    isUpdatingGoals: isPending
  };
}
