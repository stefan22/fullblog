import { ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen mb-0 w-full flex items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href="/" className={cn(buttonVariants({ variant: 'secondary' }))}>
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>

      <div className="w-full md:mx-auto">{children}</div>
    </div>
  );
}
