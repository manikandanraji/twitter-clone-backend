module.exports = {
  Mutation: {
    deleteComment: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated.");

      // 2. check if the comment exists
      // and the user has permission to delete it
      const exists = await ctx.prisma.$exists.comment({
        AND: [{ id: args.id }, { user: { id: userId } }],
      });

      // if no permissions, then throw an error
      if (!exists) throw Error("You don't have permission for this action");

      // 3. delete the comment
      const comment = await ctx.prisma.deleteComment({ id: args.id });

      return comment;
    },
  },
};
