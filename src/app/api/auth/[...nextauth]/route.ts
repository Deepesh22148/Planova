import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import UserModel from "@/models/user.model";
import { compare } from "bcrypt";
import dbConnect from "@/lib/dbConnect";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name?: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: (user._id as { toString: () => string }).toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      await dbConnect();

      // Google login
      if (account?.provider === "google" && profile?.email) {
        let dbUser = await UserModel.findOne({ email: profile.email });

        if (!dbUser) {
          dbUser = await UserModel.create({
            name: profile.name,
            email: profile.email,
            username: profile.email.split("@")[0],
          });
        }

        token.id = (dbUser._id as unknown as { toString: () => string }).toString();
        token.username = dbUser.username;
      }

      // Credentials login
      if (user) {
        token.id = (user as any).id;
        token.username = (user as any).username;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
