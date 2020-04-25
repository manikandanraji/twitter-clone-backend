module.exports = {
	Mutation: {
		retweet: async (parent, args, ctx) => {
			// 1. make sure the user is authenticated
			const userId = ctx.getUserId(ctx);
			if (!userId) throw Error("You need to be authenticated");

			// 2. make sure the tweet actually exists
			const tweet = await ctx.prisma.tweet({ id: args.id });

			// 3. make sure the tweet is someone else
			const someoneElseTweet = await ctx.prisma.user({ id: userId }).tweets({
				where: {
					id_contains: args.id
				}
			})
			if(someoneElseTweet) throw Error("You can't retweet your own tweet.");

			if (!tweet) throw Error(`No tweet found for id - ${args.id}`);

			await ctx.prisma.updateUser({
				where: { id: userId },
				data: {
					retweets: {
						set: {
							id: tweet.id
						}
					}
				}
			});

			return tweet;
		}
	}
};
