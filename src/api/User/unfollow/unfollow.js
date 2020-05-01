module.exports = {
  Mutation: {
    unfollow: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. first check if the user is following him, if not throw error
      const following = await ctx.prisma.user({ id: userId }).following({
        where: { id_contains: args.id },
      });

      if (!following.length) throw Error("You are not following him.");

      // 3. if following, then disconnect the relationship
      await ctx.prisma.updateUser({
        where: { id: userId },
        data: {
          following: {
            disconnect: {
              id: args.id,
            },
          },
        },
      });

      // 4. return boolean indication sucess or failure
      return true;
    },
  },
};
