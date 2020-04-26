const util = require('util');

module.exports = {
	Query: {
		searchByTag: async (parent, args, ctx) => {
			const tweets = await ctx.prisma
				.tags({ where: { text_contains: args.term } })
				.tweets();

			return tweets.length ? tweets[0].tweets : []
		}
	}
};
