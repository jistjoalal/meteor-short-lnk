import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    // user must be logged in to submit link
    if (!this.userId) throw new Meteor.Error('not-authorized');

    // schema validation
    new SimpleSchema({
      url: {
        label: 'Your Link',
        type: String,
        regEx: SimpleSchema.RegEx.Url,
      },
      userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
      },
    }).validate({
      url,
      userId: this.userId,
    });

    // insert into db
    Links.insert({
      url,
      userId: this.userId,
    });
  },
});