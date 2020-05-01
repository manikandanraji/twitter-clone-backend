const { PROFILE_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    profile: (parent, args, ctx) =>
      ctx.prisma.user({ handle: args.handle }).$fragment(PROFILE_FRAGMENT),
  },
};
