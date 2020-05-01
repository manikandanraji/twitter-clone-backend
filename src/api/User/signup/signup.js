const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    signup: async (parent, args, ctx) => {
      // check if the email and username is unique
      const exists = await ctx.prisma.$exists.user({
        OR: [{ email: args.email }, { handle: args.handle }],
      });

      if (exists)
        throw Error("The email/handle already exists, try different ones");

      // hash the password, save the user in db
      const hashedPw = await bcrypt.hash(args.password, 10);

      // generate a jsonwebtoken using the userid as payload
      const { password, ...user } = await ctx.prisma.createUser({
        ...args,
        password: hashedPw,
      });

      // generate jsonwebtoken using userid as payload
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return {
        token,
        user,
      };
    },
  },
};
