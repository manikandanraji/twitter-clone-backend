const { TWEET_FRAGMENT } = require("../../../utils/fragments");

module.exports = {
  Query: {
    searchByTweet: async (parent, args, ctx) =>
      ctx.prisma
        .tweets({
          where: {
            text_contains: args.term,
          },
        })
        .$fragment(TWEET_FRAGMENT),
  },
};
