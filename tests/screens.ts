import { screen } from '@testing-library/react-native';

export async function waitForWelcome() {
  await screen.findByText('Controle sua dieta de forma simples');
}

export async function waitForHome() {
  await screen.findByText('Refeições');
}
