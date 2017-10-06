const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
// convert email to lowercase first, ensures emails are unique
// so me@foo.com and Me@foo.com are considered the same email
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// on Save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to this instance of user model
  const user = this;

  // generate a salt (takes some time), then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash(encrypt) a password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrtpyed password
      user.password = hash;
      // next means save the user
      next();
    });
  });
})

// whenever we create a user object it has access to these methods
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this.password is the already salted password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

// Create the model class
// create new users here
// load the schema into mongoose
// it corresponds to a collection called user
// it represents all users
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
