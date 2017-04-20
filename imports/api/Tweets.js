import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";
// var Twitter = require("twitter");

// TODO: Now we have only one stream overall,
// we should have one per user at least
let stream = null;

// This is a in memory only collection
export const Tweets = new Mongo.Collection("tweets");


// Twitter streamer should run only on the server
if (Meteor.isServer) {
  Meteor.publish("tweets", function tweetsPublication() {
    return Tweets.find({}, {sort: {created_at: -1}, limit:10});
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.stream"(query) {
      console.log("Twitter search" + query);

      // Create the Twitter object
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });

      if (stream) {
        console.log("Stopping previous stream");
        stream.destroy();
        // Remove all the tweets
        Tweets.remove({});
      }

      stream = client.stream("statuses/filter", {track: query});
      stream.on("data", Meteor.bindEnvironment(function(tweet) {
        // console.log(tweet.text);
        // resolve(tweet);
        Tweets.insert(tweet);
      }));

      stream.on("error", function(error) {
        console.log(error);
        throw Meteor.Error(error);
      });
    }// twitter.stream
  }); //Meteor.methods
}
