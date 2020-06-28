const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Mutation: {
    updateTweet: async (parent, args, ctx) => {
      // you need to be authenticated
      const userId = ctx.getUserId(ctx);

      if (!userId) throw new Error("You need to be authenticated");

      const { id, ...fieldsToUpdate } = args;
      const tweet = await ctx.prisma.tweet({ id }).$fragment(TWEET_FRAGMENT);

      // check if the tweet exists
      if (!tweet) {
        throw new Error(`No tweet found for id - ${id}`);
      }

      // make sure the tweet belongs to the loggedin user
      if (userId !== tweet.user.id) {
        throw new Error("You don't have permissions to commit this action");
      }

      // now update
      const updatedTweet = await ctx.prisma.updateTweet({
        where: { id },
        data: fieldsToUpdate,
      });

      return updatedTweet;
    },
  },
};
