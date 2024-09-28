import nexiosInstance from "@/src/lib/NexiosInstance";
import { cookies } from "next/headers";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

async function handleSocialLogin(accountProvider: string, profile: any) {
  try {
    const response: any = await nexiosInstance.post("/auth/social-login", {
      name: profile.name,
      email: profile.email,
      profilePhoto:
        accountProvider === "google" ? profile.picture : profile.avatar_url,
    });

    const { accessToken, refreshToken } = response.data.data;

    if (accessToken && refreshToken) {
      cookies().set("accessToken", accessToken);
      cookies().set("refreshToken", refreshToken);
      return true;
    }

    // console.error("Missing tokens in response:", data.data);
    return false;
  } catch (error: any) {
    console.error("Error during social login:", error.message);
    return false;
  }
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }: any) {
      if (!profile || !account) {
        console.error("Missing profile or account information");
        return false;
      }

      if (account.provider === "google" || account.provider === "github") {
        return await handleSocialLogin(account.provider, profile);
      }

      return false;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
