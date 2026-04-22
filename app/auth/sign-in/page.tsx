'use client';

import { signInSchema } from '@/app/schemas/auth';
import { useForm, Controller } from 'react-hook-form';
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  buttonVariants,
} from '@/components/ui';

import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSignin = async (data: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in Successfully');
            form.reset({
              email: '',
              password: '',
            });
            router.push('/');
          },
          onError: (err) => {
            toast.error(err.error.message);
          },
        },
      });
    });
  };

  return (
    <Card className="px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Signin with your email and password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSignin)}>
          <FieldGroup className={'gap-4'}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    className={cn(
                      buttonVariants({
                        size: 'lg',
                        variant: 'outline',
                      })
                    )}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="Enter email"
                    autoComplete="email"
                    required
                    {...field}
                    name="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    className={cn(
                      buttonVariants({
                        size: 'lg',
                        variant: 'outline',
                      })
                    )}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    required
                    {...field}
                    name="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="gap-4" />
            <Button
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'lg',
                })
              )}>
              {isPending ?
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              : <span>Sign In</span>}
            </Button>
          </FieldGroup>
        </form>
        <p className="flex justify-center w-full text-muted-foreground text-xs pt-3">
          Don&apos;t have an account?. &nbsp;{' '}
          <Link className="text-blue-900" href="/auth/sign-up">
            Click here
          </Link>
          &nbsp; to sign up.
        </p>
      </CardContent>
    </Card>
  );
}
