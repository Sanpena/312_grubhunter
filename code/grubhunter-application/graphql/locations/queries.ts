import {findAllLocations,findLocationsById,onUserWishlist} from "../../mongoose/locations/services";

export const locationQueryResolvers = {
    allLocations: async () => {
        return await findAllLocations();
    },

    locationsById: async (_: any, { location_id }: any) => {
        return await findLocationsById([location_id]);
    },

    onUserWishlist: async (_: any, { userId }: any) => {
        return await onUserWishlist(userId);
    },
};