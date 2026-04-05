export const locationQueries = `
    allLocations: [Location]
    locationsById(location_id: String!): [Location]
    onUserWishlist(userId: String!): [Location]
`;