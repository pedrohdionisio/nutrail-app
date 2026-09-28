import { toProfileFormValues } from 'presentation/screens/Profile/utils/toProfileFormValues';
import { buildMe } from 'tests/support/fixtures/me';

describe('toProfileFormValues', () => {
  it('should format the profile the way the fields are typed', () => {
    expect(toProfileFormValues(buildMe().profile)).toEqual({
      name: 'Ana Souza',
      birthDate: '07/03/1990',
      height: '165',
      weight: '62,5',
      gender: 'FEMALE',
      goal: 'LOSE',
      activityLevel: 'LIGHT'
    });
  });
});
