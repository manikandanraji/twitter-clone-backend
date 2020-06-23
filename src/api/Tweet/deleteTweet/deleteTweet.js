const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Mutation: {
    deleteTweet: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. check if the tweet exists
      const tweet = await ctx.prisma
        .tweet({ id: args.id })
        .$fragment(TWEET_FRAGMENT);
      if (!tweet) {
        throw Error(`No tweet for found id - ${args.id}`);
      }

      // 3. make sure the tweet belongs to the user
      if (tweet.user.id !== userId) {
        throw Error("You don't have permission to delete this tweet");
      }

      return ctx.prisma.deleteTweet({ id: args.id });
    },
  },
};
