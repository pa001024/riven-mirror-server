import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    ReplaceHello(text: String): HelloUpdateResponse
  }
  type HelloUpdateResponse {
    success: Boolean!
    hello: String
  }
`;

let vHello = "";

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => `Hello world! ${vHello}`,
  },
  Mutation: {
    ReplaceHello: (_, { text }, { dataSources }) =>
      ({
        success: true,
        hello: vHello = text
      })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
