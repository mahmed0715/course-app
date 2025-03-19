import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Example provider

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "John Doe", email: "6jR2l@example.com" };
        return user;
      },
    })
    // Add other providers here
  ],
  callbacks: {
    async session({ session, user }) {
      // Optionally attach user data to session
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
