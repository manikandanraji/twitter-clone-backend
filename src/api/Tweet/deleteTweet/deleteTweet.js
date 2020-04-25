module.exports = {
	Mutation: {
		deleteTweet: async (parent, args, ctx) => {
			// 1. make sure the user is authenticated
			const userId = ctx.getUserId(ctx);
			if (!userId) throw Error("You need to be authenticated");


			// 2. check if the tweet exists
			const exists = await ctx.prisma.$exists.tweet({ id: args.id })
			if(!exists) {
				throw Error(`No tweet exists for this id - ${args.id}`)
			}

			// 3. return the deleted tweet
			return ctx.prisma.deleteTweet({ id: args.id })
		}
	}
};
