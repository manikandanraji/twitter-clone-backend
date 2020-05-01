const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTag: async (parent, args, ctx) => {
      const tweets = await ctx.prisma
        .tags({ where: { text_contains: args.term } })
        .tweets()
        .$fragment(TWEET_FRAGMENT);

      return tweets.length ? tweets[0].tweets : [];
    },
  },
};
