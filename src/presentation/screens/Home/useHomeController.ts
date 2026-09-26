import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';

export function useHomeController() {
  const { signOut } = useAuth();

  return {
    handleSignOut: signOut
  };
}
