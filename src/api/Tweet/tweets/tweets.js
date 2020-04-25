module.exports = {
	Query: {
		tweets: (parent, args, ctx) => ctx.prisma.tweets()
	}
}
