const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require("merge-graphql-schemas");

const typeDefs = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const resolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

module.exports = schema;
