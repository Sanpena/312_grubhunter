import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import dbConnect from "../../middleware/mongodb";

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req) => {
        await dbConnect();
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        return { token };
    },
});

const allowCors = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Allow", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    return handler(req, res);
};

export default allowCors;