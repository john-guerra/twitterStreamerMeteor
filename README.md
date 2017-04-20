# twitterStreamerMeteor

A simple boilerplate for a Meteor 1.4 Twitter streamer application with React. Uses the twitter [npm](https://www.npmjs.com/package/twitter) module for connecting to twitter. It requires you to setup your credentials on the server using environment variables:

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

meteor npm install
meteor
```

This is a very basic implementation that handles a global search shared by all users and doesn't implement any security or restriction. It's intended as a starting point, so add your own requirements.
