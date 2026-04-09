'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/web/ThemeToggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: 'ghost',
            })}
            href="/">
            Home
          </Link>

          <Link
            className={buttonVariants({
              variant: 'ghost',
            })}
            href="/auth/blog">
            Blog
          </Link>

          <Link
            className={buttonVariants({
              variant: 'ghost',
            })}
            href="/auth/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoading ?
          'Loading...'
        : isAuthenticated ?
          <Button
            onClick={() =>
              startTransition(async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success('Signed out successfully.', {
                        position: 'bottom-right',
                      });
                      router.push('/');
                    },
                    onError: (err) => {
                      toast.error(err.error.message, {
                        position: 'bottom-right',
                      });
                    },
                  },
                });
              })


            }>
            {isPending ? <span>See ya!</span> : <span>Sign Out</span>}
          </Button>
        : <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign Up
            </Link>

            <Link
              className={buttonVariants({
                variant: 'outline',
              })}
              href="/auth/sign-in">
              Sign In
            </Link>
          </>
        }

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
