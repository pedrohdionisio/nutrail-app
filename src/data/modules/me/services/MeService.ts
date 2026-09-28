import { api } from 'data/config/api';
import type { IMe } from 'shared/entities/IMe';

async function get(): Promise<IMe> {
  const { data } = await api.get<IMe>('/me');

  return data;
}

async function remove(): Promise<void> {
  await api.delete('/me');
}

export const MeService = {
  get,
  remove
};
