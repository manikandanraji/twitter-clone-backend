module.exports = {
	Query: {
		users: (parent, args, ctx) => ctx.prisma.users()
	}
}
