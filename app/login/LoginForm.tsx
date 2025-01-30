// Client Component: LoginForm.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming Radix UI Input
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (res?.error) {
        // throw new Error(res.error);
        console.log('res.error: ', res.error);
      }

      // Redirect or other logic after successful login
      // window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          aria-label="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          aria-label="Password"
        />
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </div>
    </form>
  );
}
