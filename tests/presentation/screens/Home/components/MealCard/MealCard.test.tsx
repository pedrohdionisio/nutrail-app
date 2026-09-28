import { render, screen } from '@testing-library/react-native';
import { MealCard } from 'presentation/screens/Home/components/MealCard/MealCard';
import { buildMeal } from 'tests/support/fixtures/meal';

describe('MealCard', () => {
  it('should show the meal time, name and macros', async () => {
    await render(
      <MealCard
        isRetrying={false}
        meal={buildMeal()}
        onDelete={jest.fn()}
        onPress={jest.fn()}
        onRetry={jest.fn()}
      />
    );

    expect(screen.getByText('12h15')).toBeOnTheScreen();
    expect(screen.getByText('Pão, manteiga e café')).toBeOnTheScreen();
    expect(screen.getByText('210')).toBeOnTheScreen();
    expect(screen.getByText('5g')).toBeOnTheScreen();
    expect(screen.getByText('25g')).toBeOnTheScreen();
    expect(screen.getByText('9g')).toBeOnTheScreen();
  });
});
