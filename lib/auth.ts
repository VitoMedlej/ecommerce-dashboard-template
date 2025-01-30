import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        
        try {
          const response = await fetch(
            `${process.env.EXTERNAL_API_URL}/api/dashboard/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TKN}`,
              },
              body : JSON.stringify({user: {email: credentials.email, password: credentials.password}})
            }
          );

          if (!response.ok) throw new CredentialsSignin('Invalid credentials');

          const data = await response.json();

          if ( data?.responseObject?.user && data?.responseObject?.token) {
            return data?.responseObject;
          }
          throw new CredentialsSignin('Invalid credentials');
        } catch (error) {
          console.error('error: ', error);
          return null;
          // throw new CredentialsSignin('Authentication failed');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      
      return baseUrl;  
    }
  }
});
