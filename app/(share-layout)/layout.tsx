import { ReactNode } from 'react';
import Navbar from '@/components/web/navbar';
import { Footer } from '@/components/web/footer';

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-6 lg:px-8">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </>
  );
}
