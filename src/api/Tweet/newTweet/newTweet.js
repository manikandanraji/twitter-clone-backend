module.exports = {
  Mutation: {
    newTweet: async (parent, args, ctx) => {
      // 1. make sure the user is authenticated
      const userId = ctx.getUserId(ctx);
      if (!userId) throw Error("You need to be authenticated");

      // 2. create a new tweet
      const { text, files, tags = [] } = args;

      const tweet = await ctx.prisma.createTweet({
        text,
        tags: {
          set: tags,
        },
        user: { connect: { id: userId } },
      });

      // 3. if there is any file, create it
      if (files && files.length) {
        files.forEach(async (file) => {
          await ctx.prisma.createFile({
            url: file,
            tweet: { connect: { id: tweet.id } },
            user: { connect: { id: userId } },
          });
        });
      }

      // 4. for every tag associate it with the tweet
      if (tweet.tags && tweet.tags.length) {
        tweet.tags.forEach(async (tag) => {
          // if the tag already exits update the tag
          const [res] = await ctx.prisma.tags({
            where: {
              text: tag,
            },
          });

          if (res) {
            await ctx.prisma.updateTag({
              where: {
                id: res.id,
              },
              data: {
                tweets: {
                  connect: { id: tweet.id },
                },
              },
            });
          } else {
            // otherwise create a new tag
            await ctx.prisma.createTag({
              text: tag,
              tweets: {
                connect: { id: tweet.id },
              },
            });
          }
        });
      }

      // 5. return tweet
      return tweet;
    },
  },
};
