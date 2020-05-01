module.exports = {
  Comment: {
    isCommentMine: (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      return ctx.prisma.$exists.comment({
        AND: [{ id: parent.id }, { user: { id: userId } }],
      });
    },
  },
};
