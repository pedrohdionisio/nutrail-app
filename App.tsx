import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts
} from '@expo-google-fonts/host-grotesk';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import 'data/config/i18n';
import { queryClient } from 'data/config/queryClient';
import { AuthProvider } from 'data/contexts/AuthProvider/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { AppError } from 'presentation/screens/AppError/AppError';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from 'shared/navigation/Navigation';
import './src/styles/global.css';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontsLoaded, fontsError] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold
  });

  if (!isFontsLoaded && !fontsError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <StatusBar style='dark' />

          <ErrorBoundary FallbackComponent={AppError}>
            <BottomSheetModalProvider>
              <AuthProvider>
                <Navigation />
              </AuthProvider>
            </BottomSheetModalProvider>
          </ErrorBoundary>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
