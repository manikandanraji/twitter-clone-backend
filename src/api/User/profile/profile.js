const { PROFILE_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
	Query: {
		profile: (parent, args, ctx) =>
			ctx.prisma.user({ id: args.id }).$fragment(PROFILE_FRAGMENT)
	}
};
