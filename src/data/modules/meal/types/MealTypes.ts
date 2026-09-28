import type { MealInputType } from 'shared/constants/meal';
import type { IMacros } from 'shared/entities/IMacros';
import type { IMealItem } from 'shared/entities/IMealItem';

export interface IListMealsPayload {
  date: string;
}

export interface ICreateManualMealPayload {
  date: string;
  time: string;
  text: string;
}

export interface ICreateManualMealResponse {
  id: string;
  name: string;
}

export interface ICreatePictureUploadPayload {
  mealId: string;
}

export interface IUploadSignature {
  url: string;
  fields: Record<string, string>;
}

export interface ICreatePictureUploadResponse {
  upload: IUploadSignature;
}

export interface IUploadPicturePayload {
  upload: IUploadSignature;
  pictureUri: string;
}

export interface IUploadAudioPayload {
  upload: IUploadSignature;
  audioUri: string;
}

export interface ICreateMealPayload {
  date: string;
  time: string;
  inputType: Extract<MealInputType, 'PICTURE' | 'AUDIO'>;
}

export interface ICreateMealResponse {
  mealId: string;
  upload: IUploadSignature;
}

export interface IGetMealPayload {
  mealId: string;
}

export interface IDeleteMealPayload {
  mealId: string;
}

export interface IReprocessMealPayload {
  mealId: string;
}

export interface IUpdateMealPayload {
  mealId: string;
  name: string;
  items: IMealItem[];
}

export interface IUpdateMealResponse extends IMacros {
  name: string;
  items: IMealItem[];
}

export interface IAnalyzeMealItemsPayload {
  text: string;
}

export interface IAnalyzeMealItemsResponse {
  items: IMealItem[];
}
