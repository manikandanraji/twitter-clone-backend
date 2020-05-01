module.exports = {
  Mutation: {
    toggleRetweet: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. make sure the tweet actually exists
      const tweet = await ctx.prisma.tweet({ id: args.id });
      if (!tweet) throw Error(`No tweet exists for id - ${args.id}`);

      // 3. make sure the tweet is someone else
      const isTweetMine = await ctx.prisma.tweets({
        where: {
          AND: [{ id: args.id }, { user: { id: userId } }],
        },
      });
      if (isTweetMine.length) throw Error("You cannot retweet your own tweet");

      // 4. remove the retweet if it already exists
      // otherwise, retweeeeeeet
      const retweetExists = await ctx.prisma.retweets({
        where: {
          AND: [{ tweet: { id: args.id } }, { user: { id: userId } }],
        },
      });

      if (retweetExists.length) {
        await ctx.prisma.deleteRetweet({ id: retweetExists[0].id });
        return true;
      } else {
        await ctx.prisma.createRetweet({
          user: {
            connect: { id: userId },
          },
          tweet: {
            connect: { id: args.id },
          },
        });
        return true;
      }

      return false;
    },
  },
};
