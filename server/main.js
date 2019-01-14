import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup

  const petSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 20,
      optional: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    contactNumber: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Phone,
    }
  });

  petSchema.validate({
    age: 2,
  });

  // employeeSchema
  // name - 1-200, required
  // hourlyWage - >0
  // email - regex
  const employeeSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200,
    },
    hourlyWage: {
      type: Number,
      min: 1,
      optional: true,
    },
    email: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Email,
    },
  });

  employeeSchema.validate({
    name: 'swag man',
    hourlyWage: 1,
    email: 'asdf@b.com',
  });
});
