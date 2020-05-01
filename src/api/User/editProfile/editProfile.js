module.exports = {
  Mutation: {
    editProfile: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated.");

      const user = await ctx.prisma.updateUser({
        where: { id: userId },
        data: {
          ...args,
        },
      });

      return user;
    },
  },
};
