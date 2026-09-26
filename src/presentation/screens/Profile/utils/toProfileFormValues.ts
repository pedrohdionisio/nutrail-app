import type { UpdateProfileFormType } from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import type { IUserProfile } from 'shared/entities/IUserProfile';
import { toBrazilianDate } from 'shared/utils/toBrazilianDate';

export function toProfileFormValues({
  name,
  birthDate,
  height,
  weight,
  gender
}: IUserProfile): UpdateProfileFormType {
  return {
    name,
    birthDate: toBrazilianDate(birthDate),
    height: String(height),
    weight: String(weight).replace('.', ','),
    gender
  };
}
