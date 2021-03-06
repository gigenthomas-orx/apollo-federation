import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const contents = [
  { id: "1", title: "Batman", year: "1989" },
  { id: "2", title: "Batman Returns", year: "1992" },
  { id: "3", title: "Batman: The Animated Series", year: "1992" },
];

const typeDefs = gql`
  type Query {
    contents: [Content]
  }

  type Content @key(fields: "id") {
    id: ID!
    title: String
    year: String
  }
`;

const resolvers = {
  Query: {
    contents() {
      return contents;
    },
  },
  Content: {
    __resolveReference(content: { id: string; }) {
      return contents.find(c => c.id === content.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Content service ready at ${url}`);
});