const jwt = require('jsonwebtoken');

exports.getUserId = ctx => {
	const token = ctx.request.get('Authorization');
	if(token) {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.userId;
	}

	throw Error("You need to be authenticated.")
}
