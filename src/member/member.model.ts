import * as mongoose from "mongoose";
import Member from "./member.interface";

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  department: String,
});

const MemberModel = mongoose.model<Member & mongoose.Document>(
  "Member",
  memberSchema
);

export default MemberModel;
