const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// al usar este plugin, ya no necesitar definir en el esquema de UserSchema el password y el usuario, por lo que queda de esta manera:
// y esto me sirve para la AUTENTIFICACION:
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
