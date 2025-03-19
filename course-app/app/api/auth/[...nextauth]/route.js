import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace this with your actual authentication logic
        const user = { id: 1, email: 'instructor@example.com', role: 'INSTRUCTOR' };

        if (
          credentials.email === 'instructor@example.com' &&
          credentials.password === 'password'
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };