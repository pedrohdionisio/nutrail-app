import { api } from 'data/config/api';
import type { IMe } from 'shared/entities/IMe';
import type { IChangePasswordPayload } from '../types/MeTypes';

async function get(): Promise<IMe> {
  const { data } = await api.get<IMe>('/me');

  return data;
}

async function remove(): Promise<void> {
  await api.delete('/me');
}

async function changePassword(payload: IChangePasswordPayload): Promise<void> {
  await api.put('/me/password', payload);
}

export const MeService = {
  get,
  remove,
  changePassword
};
