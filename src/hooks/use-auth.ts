import { useContext } from 'react';
import { AuthContext } from 'src/providers/AuthProvider';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext not found');
  }

  return context;
}
