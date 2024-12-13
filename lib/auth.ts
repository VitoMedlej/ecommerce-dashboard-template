import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `https://express-ts-backend.onrender.com/users/674f60df0b2b8ea9f631643b`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TKN}`,
              },
            }
          );

          if (!response.ok) throw new CredentialsSignin('Invalid credentials');

          const user = await response.json();
          console.log('user: ', user);

          if (user?.responseObject) {
            return { id: user.responseObject.id, name: user.responseObject.name };
          }
          throw new CredentialsSignin('Invalid credentials');
        } catch (error) {
          throw new CredentialsSignin('Authentication failed');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
