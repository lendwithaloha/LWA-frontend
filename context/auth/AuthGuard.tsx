'use client'

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); 
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <div>Loading...</div>; 

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
