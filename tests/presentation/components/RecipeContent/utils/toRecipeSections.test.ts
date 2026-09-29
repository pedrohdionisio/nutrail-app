import { toRecipeSections } from 'presentation/components/RecipeContent/utils/toRecipeSections';

describe('toRecipeSections', () => {
  it('should list the ingredients and one step per non-empty line', () => {
    const sections = toRecipeSections({
      name: 'Omelete',
      ingredients: [
        { name: 'Ovo', quantity: 3, unit: 'unidades' },
        { name: 'Queijo mussarela', quantity: 40, unit: 'g' }
      ],
      instructions: '1. Bata os ovos.\n\n  2. Junte o queijo e leve à frigideira.  \n',
      calories: 390,
      protein: 28,
      carbohydrate: 2,
      fat: 30
    });

    expect(sections).toEqual([
      { title: 'common.ingredients', data: ['3 unidades Ovo', '40g Queijo mussarela'] },
      {
        title: 'common.instructions',
        data: ['1. Bata os ovos.', '2. Junte o queijo e leve à frigideira.']
      }
    ]);
  });
});
