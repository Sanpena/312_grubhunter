import { updateWishlist } from "../../mongoose/locations/services";
import { authGuard } from "../../middleware/auth-guards";
import { JWT } from "next-auth/jwt";

interface WishlistArgs {
    location_id: string;
    user_id: string;
}

interface contextInterface {
    token: JWT;
}

export const locationMutationResolvers = {
    addWishlist: async (_: any, param: WishlistArgs, context: contextInterface) => {
        const guard = authGuard(param, context);
        if (guard !== true) return guard;
        return await updateWishlist(param.location_id, param.user_id, "add");
    },

    removeWishlist: async (_: any, param: WishlistArgs, context: contextInterface) => {
        const guard = authGuard(param, context);
        if (guard !== true) return guard;
        return await updateWishlist(param.location_id, param.user_id, "remove");
    },
};