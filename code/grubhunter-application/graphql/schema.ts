import gql from "graphql-tag";
import { locationType } from "./locations/custom.gql";
import { locationQueries } from "./locations/queries.gql";
import { locationMutations } from "./locations/mutations.gql";

export const typeDefs = gql`
  	${locationType}

  	type Query {
    	${locationQueries}
  	}

  	type Mutation {
    	${locationMutations}
  	}
`;