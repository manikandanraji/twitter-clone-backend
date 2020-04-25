# Twitter Clone
This is a twitter clone build with Prisma + Graphql

# User Actions
- createAcccount (mutation)
	1) first check whether the email or handle already exits, if not throw an error
	2) Then, hash the password and a create a account
	3) At the end, return the 'AuthPayload', which is an object containing 'jwt token' and 'user object'

- login (mutation)
	1) first check whether the email is registered, if not throw an error
	2) Then, check whether the password matches, if not throw an error
	3) At the end, return the 'AuthPayload', which is an object containing 'jwt token' and 'user object'

- tweet (mutation)
- addComment (mutation)
- likeTweet (mutation)
- retweet (mutation)
- follow (mutation)
- feed (query)
- search (query)
