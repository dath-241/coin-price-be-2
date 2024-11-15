import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account) return false;

      //Get the access token from google account
      // const { accessToken } = account;

      //Use the accessToken to call Backend API

      return true;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
