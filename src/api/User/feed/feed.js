const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    feed: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // get the tweets of the user and the people whom they are following
      const following = await ctx.prisma.user({ id: userId }).following();

      const tweets = await ctx.prisma
        .tweets({
          where: {
            user: {
              id_in: following.map((user) => user.id).concat([userId]),
            },
          },
          orderBy: "createdAt_DESC",
        })
        .$fragment(TWEET_FRAGMENT);

      return tweets;
    },
  },
};
