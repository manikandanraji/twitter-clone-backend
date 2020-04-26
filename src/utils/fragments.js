const USER_FRAGMENT = `
	id
	handle
	avatar
	firstname
	lastname
`

const FILE_FRAGMENT = `
	id
	url
`;

exports.PROFILE_FRAGMENT = `
	fragment PROFILE_FRAGMENT on User {
		id
		coverPhoto
		avatar
		firstname
		lastname
    handle
    bio
    dob
    website
    location
	  following {
			id
		}
		followers {
			id
		}
		tweets {
			id
			text
			files {
				${FILE_FRAGMENT}
			}
			createdAt
		}
		createdAt
	}
`;

exports.TWEET_FRAGMENT = `
	fragment TWEET_FRAGMENT on Tweet {
		id
		text
		files {
			id
			url
		}
		user {
			${USER_FRAGMENT}
		}
		comments {
			id
			text
			user {
			  ${USER_FRAGMENT}
			}
			createdAt
		}
		createdAt
	}
`;
