'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { Button, buttonVariants } from '@/components/ui/button';
import { signUpSchema } from '@/app/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import z from 'zod';

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log('onSubmit');

    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,

      callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
      onRequest: (_ctx) => {
        //show loading
      },
      onSuccess: (_ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });


  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className={'gap-4'}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Fullname</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="name"
                    placeholder="Enter name"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="Enter email"
                    {...field}
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
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button className={buttonVariants({ variant: 'default' })}>
              Sign Up
            </Button>
          </FieldGroup>
        </form>
        <p className="flex justify-center w-full text-muted-foreground text-xs pt-3">
          Must have a valid account. &nbsp;{' '}
          <Link className="text-blue-900" href="/">
            Back to home page
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
