import { api, publicApi } from 'data/config/api';
import type { IMealDetails } from 'shared/entities/IMealDetails';
import type { IMealsOfDay } from 'shared/entities/IMealsOfDay';
import type {
  IAnalyzeMealItemsPayload,
  IAnalyzeMealItemsResponse,
  ICreateManualMealPayload,
  ICreateManualMealResponse,
  ICreateMealPayload,
  ICreateMealResponse,
  ICreatePictureUploadPayload,
  ICreatePictureUploadResponse,
  IDeleteMealPayload,
  IGetMealPayload,
  IListMealsPayload,
  IUpdateMealPayload,
  IUpdateMealResponse,
  IUploadPicturePayload
} from '../types/MealTypes';

async function list({ date }: IListMealsPayload): Promise<IMealsOfDay> {
  const { data } = await api.get<IMealsOfDay>('/meals', { params: { date } });

  return data;
}

async function getById({ mealId }: IGetMealPayload): Promise<IMealDetails> {
  const { data } = await api.get<IMealDetails>(`/meals/${mealId}`);

  return data;
}

async function create(payload: ICreateMealPayload): Promise<ICreateMealResponse> {
  const { data } = await api.post<ICreateMealResponse>('/meals', payload);

  return data;
}

async function update({ mealId, ...payload }: IUpdateMealPayload): Promise<IUpdateMealResponse> {
  const { data } = await api.put<IUpdateMealResponse>(`/meals/${mealId}`, payload);

  return data;
}

async function remove({ mealId }: IDeleteMealPayload): Promise<void> {
  await api.delete(`/meals/${mealId}`);
}

async function analyzeItems(payload: IAnalyzeMealItemsPayload) {
  const { data } = await api.post<IAnalyzeMealItemsResponse>('/meals/items/analysis', payload);

  return data.items;
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
  getById,
  create,
  update,
  remove,
  analyzeItems,
  createManual,
  createPictureUpload,
  uploadPicture
};
