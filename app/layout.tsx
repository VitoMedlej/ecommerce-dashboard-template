import ContextWrapper from './context/ContextProvider';
import './globals.css';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default  async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params : any
}) {

  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
      <ContextWrapper>
        {children}
      </ContextWrapper>
        </body>

    </html>
  );
}
