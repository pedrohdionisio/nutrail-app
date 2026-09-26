import { useQueryClient } from '@tanstack/react-query';
import {
  removeAccessToken,
  removeSessionHandlers,
  setAccessToken,
  setSessionHandlers
} from 'data/config/api';
import { isRejectedByApi } from 'data/config/apiError';
import { AuthTokensManager, type IAuthTokens } from 'data/libs/AuthTokensManager';
import { AuthService } from 'data/modules/auth/services/AuthService';
import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useState
} from 'react';
import type { IAuthContextValue } from './AuthProviderTypes';

const AuthContext = createContext<IAuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    removeSessionHandlers();
    removeAccessToken();
    queryClient.clear();
    setSignedIn(false);

    await AuthTokensManager.clear();
  }, [queryClient]);

  const refreshAccessToken = useCallback(async () => {
    const stored = await AuthTokensManager.load();

    if (!stored) {
      await signOut();

      throw new Error('Não há refresh token para renovar a sessão');
    }

    try {
      const tokens = await AuthService.refreshToken({ refreshToken: stored.refreshToken });

      setAccessToken(tokens.accessToken);

      await AuthTokensManager.save(tokens);
    } catch (error) {
      if (isRejectedByApi(error)) {
        await signOut();
      }

      throw error;
    }
  }, [signOut]);

  const startSession = useCallback(
    async (tokens: IAuthTokens) => {
      await AuthTokensManager.save(tokens);

      setAccessToken(tokens.accessToken);
      setSessionHandlers({ refreshAccessToken, signOut });
      setSignedIn(true);
    },
    [refreshAccessToken, signOut]
  );

  useEffect(() => {
    async function restoreSession() {
      const tokens = await AuthTokensManager.load();

      if (tokens) {
        await startSession(tokens);
      }

      setIsRestoringSession(false);
    }

    restoreSession();
  }, [startSession]);

  if (isRestoringSession) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signedIn, startSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa estar dentro do AuthProvider');
  }

  return context;
}
