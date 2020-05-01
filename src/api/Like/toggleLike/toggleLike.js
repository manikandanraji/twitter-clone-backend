module.exports = {
  Mutation: {
    toggleLike: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. check if the like already exists, if exists remove it
      const [like] = await ctx.prisma.likes({
        where: {
          AND: [{ user: { id: userId } }, { tweet: { id: args.id } }],
        },
      });

      if (like) {
        await ctx.prisma.deleteLike({ id: like.id });
        return true;
      }

      // if not, create a like
      if (!like) {
        await ctx.prisma.createLike({
          tweet: { connect: { id: args.id } },
          user: { connect: { id: userId } },
        });
        return true;
      }

      // 3. return boolean
      return false;
    },
  },
};
