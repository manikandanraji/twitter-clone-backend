module.exports = {
	Tweet: {
		likesCount: async (parent, args, ctx) => {
			const aggregate = await ctx.prisma
				.likesConnection({
					where: { tweet: { id: parent.id } }
				}).aggregate()

			return aggregate.count;
		},

		commentsCount: async (parent, args, ctx) => {
			const aggregate = await ctx.prisma
				.commentsConnection({
					where: { tweet: { id: parent.id } }
				})
				.aggregate()

			return aggregate.count;
		},

		retweetsCount: async (parent, args, ctx) => {
			const retweets = await ctx.prisma.tweet({ id: parent.id }).retweets();
			return retweets.length;
		}
	}
};
