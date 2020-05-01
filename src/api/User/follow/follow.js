module.exports = {
  Mutation: {
    follow: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. if the user is already following, throw an error
      const following = await ctx.prisma.user({ id: userId }).following({
        where: {
          id_contains: args.id,
        },
      });

      if (following.length) throw Error("You are following him already.");

      // 3. otherwise, follow him and return true for success
      await ctx.prisma.updateUser({
        data: {
          following: {
            connect: { id: args.id },
          },
        },
        where: {
          id: userId,
        },
      });

      return true;
    },
  },
};
