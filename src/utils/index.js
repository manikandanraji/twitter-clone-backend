const jwt = require('jsonwebtoken');

exports.getUserId = ctx => {
	const authHeader = ctx.request.get('Authorization');
	if(authHeader) {
		const token = authHeader.replace('Bearer', '');
		const {  userId } = jwt.verify(token, process.env.JWT_SECRET);
		return userId
	}

	throw Error("You need to be authenticated.")
}
