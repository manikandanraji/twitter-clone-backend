const { PROFILE_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    profile: async (parent, args, ctx) => {
      const userExists = await ctx.prisma.$exists.user({ handle: args.handle });

      if (!userExists) throw Error(`No user found for handle - ${args.handle}`);
      return ctx.prisma
        .user({ handle: args.handle })
        .$fragment(PROFILE_FRAGMENT);
    },
  },
};
