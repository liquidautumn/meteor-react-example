import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Spots = new Mongo.Collection('spots');

if (Meteor.isServer) {
  Meteor.publish('spots', function spotsPublication() {
    return Spots.find({});
  });
}

Meteor.methods({
  'spots.insert'(data) {
    check(data.imagePath, String);
    check(data.locationTitle, String);
    check(data.locationCoordinates, Object);
    data.createdAt = new Date()
    Spots.insert(data);
  }
});
