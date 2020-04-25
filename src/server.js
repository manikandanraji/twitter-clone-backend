require("dotenv").config();

const { GraphQLServer } = require("graphql-yoga");
const schema = require("./schema");

const server = new GraphQLServer({
	schema
});

const PORT = process.env.PORT || 7777;

server.start(
	{
		port: PORT
	},
	() => console.log(`server has started at http://localhost:${PORT}`)
);
