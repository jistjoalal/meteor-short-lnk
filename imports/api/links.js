import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

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
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
    });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) throw new Meteor.Error('not-authorized');

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      visible: {
        type: Boolean,
      },
    }).validate({ _id, visible })

    Links.update(
      { _id, userId: this.userId },
      { $set: { visible } },
    );
  },
});