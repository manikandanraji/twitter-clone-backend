const { COMMENT_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Mutation: {
    addComment: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2.make sure the tweet exist
      const exists = await ctx.prisma.$exists.tweet({ id: args.id });
      if (!exists) throw Error(`No tweet exists for id - ${args.id}`);

      // 3. add a comment
      const comment = await ctx.prisma
        .createComment({
          text: args.text,
          tweet: {
            connect: { id: args.id },
          },
          user: {
            connect: { id: userId },
          },
        })
        .$fragment(COMMENT_FRAGMENT);

      // 4. return the comment
      return comment;
    },
  },
};
