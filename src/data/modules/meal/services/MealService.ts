import { api, publicApi } from 'data/config/api';
import type { IMealsOfDay } from 'shared/entities/IMealsOfDay';
import type {
  ICreateManualMealPayload,
  ICreateManualMealResponse,
  ICreatePictureUploadPayload,
  ICreatePictureUploadResponse,
  IListMealsPayload,
  IUploadPicturePayload
} from '../types/MealTypes';

async function list({ date }: IListMealsPayload): Promise<IMealsOfDay> {
  const { data } = await api.get<IMealsOfDay>('/meals', { params: { date } });

  return data;
}

async function createManual(payload: ICreateManualMealPayload): Promise<ICreateManualMealResponse> {
  const { data } = await api.post<ICreateManualMealResponse>('/meals/manual', payload);

  return data;
}

async function createPictureUpload({ mealId }: ICreatePictureUploadPayload) {
  const { data } = await api.post<ICreatePictureUploadResponse>(`/meals/${mealId}/picture`);

  return data.upload;
}

async function uploadPicture({ upload, pictureUri }: IUploadPicturePayload): Promise<void> {
  const formData = new FormData();

  for (const [name, value] of Object.entries(upload.fields)) {
    formData.append(name, value);
  }

  formData.append('file', { uri: pictureUri, name: 'picture.jpg', type: 'image/jpeg' });

  await publicApi.post(upload.url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export const MealService = {
  list,
  createManual,
  createPictureUpload,
  uploadPicture
};
