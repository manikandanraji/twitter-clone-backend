const TWEET_FRAGMENT = `
	fragment TWEET_FRAGMENT on Tweet {
		id
		text
		tags
		files {
			id
			url
		}
		user {
			id
			avatar
			firstname
			lastname
			handle
		}
		createdAt
	}
`;


module.exports = {
	Query: {
		feed: async (parent, args, ctx) => {
			// 1. make sure the user is authenticated
			const userId = ctx.getUserId(ctx);
			if (!userId) throw Error("You need to be authenticated");

			// get the tweets of the user and the people whom they are following
			const following = await ctx.prisma.user({ id: userId }).following();
			const users = following.map(user => user.id);

			const tweets = await ctx.prisma.tweets({
				where: {
					user: {
						id_in: users.concat[userId]
					}
				},
				orderBy: 'createdAt_DESC'
			}).$fragment(TWEET_FRAGMENT)

			return tweets;
		}
	}
};
