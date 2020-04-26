module.exports = {
	Query: {
		searchByTweet: async (parent, args, ctx) => ctx.prisma.tweets({
			where: {
				text_contains: args.term
			}
		})
	}
}
