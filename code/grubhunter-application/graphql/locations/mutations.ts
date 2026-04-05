import { updateWishlist } from "../../mongoose/locations/services";

export const locationMutationResolvers = {
    addWishlist: async (_: any, { location_id, userId }: any) => {
        return await updateWishlist(location_id, userId, "add");
    },

    removeWishlist: async (_: any, { location_id, userId }: any) => {
        return await updateWishlist(location_id, userId, "remove");
    },
};