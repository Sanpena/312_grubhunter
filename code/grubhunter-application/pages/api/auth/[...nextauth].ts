import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

function createUserId(value: string): string {
    const hash = createHash("sha256").update(value).digest("hex");
    return hash;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, {
        providers: [
            GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            }),
        ],
        callbacks: {
            async jwt({ token }) {
            if (token.email && !token.fdlst_private_userId) {
                token.fdlst_private_userId = createUserId(token.email);
            }
            return token;
            },
            async session({ session }) {
            if (session.user.email && !session.user.fdlst_private_userId) {
                session.user.fdlst_private_userId = createUserId(session.user.email);
            }
            return session;
            },
        },
    });
}