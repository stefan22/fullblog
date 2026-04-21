import { ReactNode } from 'react';
import Navbar from '@/components/web/Navbar';

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
