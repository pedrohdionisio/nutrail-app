import { api } from 'data/config/api';
import type { IUpdateProfileResponse, UpdateProfilePayload } from '../types/ProfileTypes';

async function update(profile: UpdateProfilePayload): Promise<IUpdateProfileResponse> {
  const { data } = await api.put<IUpdateProfileResponse>('/profile', profile);

  return data;
}

export const ProfileService = {
  update
};
