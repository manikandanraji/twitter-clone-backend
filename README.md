# Twitter Clone Backend

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9d04c4d-788b-45f1-9477-7cdc22982721/deploy-status)](https://app.netlify.com/sites/twitterclone22/deploys)

Twitter clone backend built with Prisma and GraphQL.

If you are looking for the frontend repo, [click here](https://github.com/manikandanraji/twitter-clone-frontend)

Check out the [deployed site](https://twitterclone22.netlify.app)

## Core Packages

1. prisma - allows us to define our application models and generates CRUD operations from our defined models
2. graphql-yoga - graphql server
3. jsonwebtoken - authentication

## Features

- Signup / Login
- New Tweet
- Like
- Retweet
- Comment
- View Profile
- Edit Profile
- Search by users, tags, people
- Dark theme / Light theme

## Running locally

### Prisma setup

- You need to have a prisma account
- Make sure to install the prisma cli tool globally in your machine

	```bash
	npm i -g prisma

	# once you created your account, you can login from the terminal
	prisma login
	```

- Once you logged into your account, you need to create a new prisma project

	```bash
	prisma init 
	```

- Copy the 'datamodel.prisma' file in the 'prisma_setup' folder to the root directory

	```bash
	cp prisma_setup/datamodel.prisma . # assuming you are present in the root directory
	```

- Then you need to simply deploy the changes you made

	```bash
	prisma deploy
	```

### Environmental variables setup

- Create a .env file at the root directory with the following contents

```javascript
JWT_SECRET=<YOUR_SECRET>
PORT=<PORT>
```

Then run <code>npm i && npm run dev</code> to start the development server

## Watch this video on how to setup locally

[![New Tweet](screenshots/new_tweet.png)](http://www.youtube.com/watch?v=d0bUTj56bDU "Twitter Clone Setup")


## Deploying the backend to heroku

First create an heroku account and install the heroku cli globally and login

```bash
npm i -g heroku
heroku login
```

Once logged in, create a new heroku application and push it to the remote 'heroku'

```bash
heroku create
git push heroku master
```

Then you need to manually setup the environmental variables using the heroku dashboard

## UI

### Home
![Home](screenshots/home.png)

### Explore
![Explore](screenshots/explore.png)

### Profile
![Profile](screenshots/profile.png)

### Edit Profile
![Edit Profile](screenshots/edit_profile.png)

### New Tweet
![New Tweet](screenshots/new_tweet.png)

### Tweet
![Tweet](screenshots/tweet.png)
