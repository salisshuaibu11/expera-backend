const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String
  }
});

module.exports = mongoose.model("Member", MemberSchema);
