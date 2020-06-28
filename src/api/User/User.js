module.exports = {
  User: {
    fullname: (parent, args, ctx) => {
      return `${parent.firstname} ${parent.lastname}`;
    },
    isSelf: (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      return userId === parent.id;
    },
    isFollowing: async (parent, args, ctx) => {
      const userId = ctx.getUserId(ctx);
      const following = await ctx.prisma.user({ id: userId }).following({
        where: {
          id_contains: parent.id,
        },
      });
      return following.length ? true : false;
    },
    followersCount: async (parent, arg, ctx) => {
      const followers = await ctx.prisma.user({ id: parent.id }).followers();
      return followers.length;
    },
    followingCount: async (parent, args, ctx) => {
      const following = await ctx.prisma.user({ id: parent.id }).following();
      return following.length;
    },
    tweetsCount: async (parent, args, ctx) => {
      const aggregate = await ctx.prisma
        .tweetsConnection({
          where: {
            user: { id: parent.id },
          },
        })
        .aggregate();

      return aggregate.count;
    },
  },
};
