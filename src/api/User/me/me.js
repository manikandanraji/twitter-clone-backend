module.exports = {
  Query: {
    me: async (parent, args, ctx) => {
      // 1. make sure the user  is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2.return the user
      const { password, ...user } = await ctx.prisma.user({ id: userId });
      return user;
    },
  },
};
