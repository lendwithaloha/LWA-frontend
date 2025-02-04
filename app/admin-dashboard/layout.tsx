
import React from 'react';
import { Layout } from '../../components/admin-dashboard/Layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
 
    <Layout>{children}</Layout>
    
  );
}

