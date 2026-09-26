import type { UpdateProfileFormType } from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import type { IUserProfile } from 'shared/entities/IUserProfile';

export function toProfileFormValues({
  name,
  birthDate,
  height,
  weight,
  gender
}: IUserProfile): UpdateProfileFormType {
  const [year, month, day] = birthDate.split('-');

  return {
    name,
    birthDate: `${day}/${month}/${year}`,
    height: String(height),
    weight: String(weight).replace('.', ','),
    gender
  };
}
