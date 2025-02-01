import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth, signIn } from '@/lib/auth';
import { isRedirectError, redirect } from 'next/dist/client/components/redirect';

async function LoginContent() {
  try {
    const session = await auth();

    if (session) {
      redirect('/');
    }

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in using your credentials.</CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            action={async (formData) => {
              'use server';
              try {
                const email = formData.get('email')?.toString();
                const password = formData.get('password')?.toString();
                await signIn('credentials', {
                  email,
                  password,
                  redirectTo: process.env.NEXTAUTH_URL || '/',
                });
              } catch (e) {
                console.error('error from login page: ', e);
                if (isRedirectError(e)) {
                  throw e;
                }
                return null;
              }
            }}
            className="w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border"
              required
            />
            <Button className="w-full">Sign in</Button>
          </form>
        </CardFooter>
      </Card>
    );
  } catch (error) {
    console.error('Error loading login page:', error);
    return <p className="text-red-500">Please refresh the page.</p>;
  }
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
