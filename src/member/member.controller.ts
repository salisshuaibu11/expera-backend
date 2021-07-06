import * as express from "express";
import * as asyncHandler from "express-async-handler";
import Member from "./member.interface";
import memberModel from "./member.model";

import CreateMemberDto from "./member.dto";

class MemberController {
  public path = "/members";
  public router = express.Router();
  private member = memberModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllMembers);
    this.router.get(`${this.path}/:id`, this.getMemberById);
    this.router.post(this.path, this.addMember);
    this.router.delete(`${this.path}/:id`, this.deleteMember);
    this.router.patch(`${this.path}/:id`, this.modifyMember);
  }

  private getAllMembers = asyncHandler(
    async (request: express.Request, response: express.Response) => {
      const members = await memberModel.find();
      if (members) {
        response.send(members);
      }
    }
  );

  private addMember = asyncHandler(
    async (request: express.Request, response: express.Response) => {
      const memberData: Member = request.body;
      const createdMember = new memberModel({
        ...memberData,
      });

      const member = await createdMember.save();
      if (member) {
        response.send(member);
      }
    }
  );

  private getMemberById = asyncHandler(
    async (request: express.Request, response: express.Response) => {
      const ID = request.params.id;
      const member = await memberModel.findById(ID);

      if (member) {
        response.send(member);
      } else {
        response.send({
          message: "No member with this id",
        });
      }
    }
  );

  private modifyMember = asyncHandler(
    async (request: express.Request, response: express.Response) => {
      const ID = request.params.id;
      const memberData: Member = request.body;
      const updatedMember = await memberModel.findByIdAndUpdate(
        ID,
        memberData,
        { new: true }
      );
      if (updatedMember) {
        response.send(updatedMember);
      } else {
        response.send({
          message: "Member not updated",
        });
      }
    }
  );

  private deleteMember = asyncHandler(
    async (request: express.Request, response: express.Response) => {
      const ID = request.params.id;
      const successResponse = await memberModel.findByIdAndDelete(ID);
      if (successResponse) {
        response.sendStatus(200);
      } else {
        response.send({ message: "Not deleted" });
      }
    }
  );
}

export default MemberController;
