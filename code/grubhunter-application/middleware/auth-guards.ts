import { GraphQLError } from "graphql/error";
import { JWT } from "next-auth/jwt";

interface paramInterface {
    user_id: string;
    location_id: string;
}

interface contextInterface {
    token: JWT;
}

export const authGuard = (
    params: paramInterface,
    context: contextInterface
): boolean | Error => {
    if (!context) {
        return new GraphQLError("User is not authenticated", {
        extensions: { code: "UNAUTHENTICATED", http: { status: 500 } },
        });
    }

    if (!context.token) {
        return new GraphQLError("User is not authenticated", {
        extensions: { code: "UNAUTHENTICATED", http: { status: 500 } },
        });
    }

    if (!context.token.fdlst_private_userId) {
        return new GraphQLError("User is not authenticated", {
        extensions: { code: "UNAUTHENTICATED", http: { status: 500 } },
        });
    }

    if (context.token.fdlst_private_userId !== params.user_id) {
        return new GraphQLError("User is not authorized", {
        extensions: { code: "UNAUTHORIZED", http: { status: 500 } },
        });
    }

    return true;
};