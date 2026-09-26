import { useQuery } from '@tanstack/react-query';
import { MeService } from 'data/modules/me/services/MeService';
import { ME_QUERY_KEYS } from '../../keys/MeKeys';
import type { IUseGetMeParams } from './UseGetMeTypes';

export function useGetMe({ enabled = true }: IUseGetMeParams = {}) {
  const { data, isError, refetch } = useQuery({
    queryKey: [ME_QUERY_KEYS.ME],
    queryFn: MeService.get,
    enabled
  });

  return {
    me: data ?? null,
    isMeError: isError,
    refetchMe: refetch
  };
}
