'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Assuming role is stored in user metadata or custom claims
      const role = user.user_metadata?.role || 'perawat'; 
      
      if (role === 'admin' || role === 'super_admin') {
        router.replace('/dashboard/admin');
      } else {
        router.replace('/dashboard/perawat');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex-center full-height">
      <div className="spinner"></div>
      <p className="ml-4">Routing to your dashboard...</p>
    </div>
  );
}
