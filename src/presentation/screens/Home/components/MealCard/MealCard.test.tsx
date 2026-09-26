import { render, screen } from '@testing-library/react-native';
import { buildMeal } from 'tests/fixtures/meal';
import { MealCard } from './MealCard';

describe('MealCard', () => {
  it('should show the meal time, name and macros', async () => {
    await render(<MealCard meal={buildMeal()} />);

    expect(screen.getByText('12h15')).toBeOnTheScreen();
    expect(screen.getByText('Pão, manteiga e café')).toBeOnTheScreen();
    expect(screen.getByText('210')).toBeOnTheScreen();
    expect(screen.getByText('5g')).toBeOnTheScreen();
    expect(screen.getByText('25g')).toBeOnTheScreen();
    expect(screen.getByText('9g')).toBeOnTheScreen();
  });
});
