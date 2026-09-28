import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, userEvent } from '@testing-library/react-native';
import { AuthProvider } from 'data/contexts/AuthProvider/AuthProvider';
import { AuthTokensManager } from 'data/libs/AuthTokensManager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from 'shared/navigation/Navigation';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
        gcTime: Number.POSITIVE_INFINITY
      },
      mutations: { retry: false, gcTime: Number.POSITIVE_INFINITY }
    }
  });
}

export async function seedSession() {
  await AuthTokensManager.save({ accessToken: 'access-token', refreshToken: 'refresh-token' });
}

export async function renderApp() {
  const queryClient = createTestQueryClient();

  return {
    user: userEvent.setup(),
    queryClient,
    ...(await render(
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <AuthProvider>
              <Navigation />
            </AuthProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    ))
  };
}
