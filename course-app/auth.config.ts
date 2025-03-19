import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          }
        );
        console.log('response from api ', response);
        if (!response.ok) {
          if (response.status == 400) {
            return null;
          }
          if (response.status == 500) {
            throw new Error(response.statusText);
          }
        }

        const { data } = await response.json();
        console.log('data from api ', data);
        if (data?.user) {
          // Return user object with tokens
          const returning = {
            ...data.user,
            name: data.user.firstName + ' ' + data.user.lastName,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: data.expires_at
          };
          console.log('authorise returning', returning);
          return returning;
        } else {
          return null;
        }
      }
      // async authorize22(credentials, req) {

      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error('Invalid credentials');
      //   }
      //   // add logic to call server to check if user exists
      //   // if user does not exist
      //   // return error
      //   // if user exists return user

      //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       email: credentials?.email,
      //       password: credentials?.password
      //     })
      //   })
      //   const { data } = await response.json();
      //   console.log("in authorize:", response.ok, data);
      //   if (response.ok && data?.user) {
      //     // Return user object which includes backend access and refresh tokens
      //     const returning = {
      //       ...data.user,
      //       accessToken: data.user.access_token,
      //       refreshToken: data.user.refresh_token,
      //     };
      //     return returning
      //   }

      //   // const user = {
      //   //   id: '1',
      //   //   name: 'John',
      //   //   email: credentials?.email as string
      //   // };

      //     return null;

      // }
    })
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = (auth?.user as any)?.role ?? 'customer';
      if (pathname.startsWith('/signin') && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (pathname.startsWith('/dashboard') && role !== 'admin') {
        return Response.redirect(new URL('/', nextUrl));
      }
      return !!auth;
    },
    // JWT Callback
    jwt({ token, user }: any) {
      console.log('user in jwt:', user);
      // On initial sign-in, store the user data and tokens in JWT
      if (user) {
        token = { ...token, ...user };
        token.id = user?.id;
        token.role = user.role;
        token.email = user?.email;
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        token.expiresAt = user?.expiresAt;
      }
      return token;
    },
    // Session Callback
    session({ session, token }: any) {
      console.log('token in session', token);
      session.user = {
        ...session.user,
        id: token?.id,
        role: token?.role,
        email: token?.email,
        accessToken: token?.accessToken,
        refreshToken: token?.refreshToken,
        expiresAt: token?.expiresAt
      };
      console.log('returning session user', session.user);
      return session;
    }
  },
  pages: {
    signIn: '/signin' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
