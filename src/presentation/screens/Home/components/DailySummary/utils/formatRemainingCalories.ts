export function formatRemainingCalories(consumed: number, goal: number) {
  const difference = goal - consumed;

  if (difference < 0) {
    return `${-difference} kcal acima da meta`;
  }

  return `${difference} kcal restantes`;
}
