import { buildMe } from 'tests/fixtures/me';
import { toProfileFormValues } from './toProfileFormValues';

describe('toProfileFormValues', () => {
  it('should format the profile the way the fields are typed', () => {
    expect(toProfileFormValues(buildMe().profile)).toEqual({
      name: 'Ana Souza',
      birthDate: '07/03/1990',
      height: '165',
      weight: '62,5',
      gender: 'FEMALE'
    });
  });
});
