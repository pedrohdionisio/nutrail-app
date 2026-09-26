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
