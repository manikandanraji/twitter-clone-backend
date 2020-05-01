module.exports = {
  Tweet: {
    likesCount: async (parent, args, ctx) => {
      const aggregate = await ctx.prisma
        .likesConnection({
          where: { tweet: { id: parent.id } },
        })
        .aggregate();

      return aggregate.count;
    },
    commentsCount: async (parent, args, ctx) => {
      const aggregate = await ctx.prisma
        .commentsConnection({
          where: { tweet: { id: parent.id } },
        })
        .aggregate();

      return aggregate.count;
    },
    retweetsCount: async (parent, args, ctx) => {
      const aggregate = await ctx.prisma
        .retweetsConnection({
          where: {
            tweet: {
              id: parent.id,
            },
          },
        })
        .aggregate();
      return aggregate.count;
    },
    isLiked: (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      return ctx.prisma.$exists.like({
        AND: [{ tweet: { id: parent.id } }, { user: { id: userId } }],
      });
    },
    isTweetMine: (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      return ctx.prisma.$exists.tweet({
        AND: [{ id: parent.id }, { user: { id: userId } }],
      });
    },
    isRetweet: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      const retweets = await ctx.prisma.retweets({
        where: {
          user: { id: userId },
          tweet: { id: parent.id },
        },
      });

      return retweets.length ? true : false;
    },
  },
};
