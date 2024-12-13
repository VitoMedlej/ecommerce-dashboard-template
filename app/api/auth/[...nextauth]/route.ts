import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
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

          if (!response.ok) {
            throw new Error('API request failed');
          }

          const data = await response.json();

          if (data?.isAdmin) {
            return { id: data.userId, name: data.username }; // Customize based on your API response
          } else {
            return null;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
