module.exports = {
	Mutation: {
		newTweet: async (parent, args, ctx) => {
			// 1. make sure the user is authenticated
			const userId = ctx.getUserId(ctx);
			console.log(userId)
			if (!userId) throw Error("You need to be authenticated");

			// 2. create a new tweet
			const { text, files, tags = [] } = args;

			const tweet = await ctx.prisma.createTweet({
				text,
				tags: {
					set: tags
				},
				user: { connect: { id: userId } }
			});

			// 3. if there is any file, create it
			if (files) {
				files.forEach(async file => {
					await ctx.prisma.createFile({
						url: file,
						tweet: { connect: { id: tweet.id } },
						user: { connect: { id: userId } }
					});
				});
			}

			// 4. return tweet
			return tweet;
		}
	}
};
