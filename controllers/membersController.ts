import express from "express";
const asyncHandler = require("express-async-handler");
const Member = require("../models/Member.js");

const getMembersList = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const members = await Member.find();
    res.json(members);
  }
);

// @desc Add new member
// @route POST /members/create-member
// @access Public
const addNewMember = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { name, email, address, gender } = req.body;

    const memberExists = await Member.findOne({ email });

    if (memberExists) {
      res.status(400);
      throw new Error("Member already exists");
    }

    const member = await Member.create({
      name,
      email,
      address,
      gender,
    });

    res.json(member);
  }
);

// @desc Get a member
// @route GET /members/member/:id
// @access Public
const getSingleMember = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const member = await Member.findById(id);

    res.json(member);
  }
);

// @desc Update a member
// @route UPDATE /members/member/:id
// @access Public
const updateMember = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const updatedMember = await Member.findByIdAndUpdate(id, {
      $set: req.body,
    });

    res.json(updatedMember);
  }
);

// @desc Delete a member
// @route DELETE /members/member/:id
// @access Public
const deleteMember = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    await Member.findByIdAndDelete(id);

    res.status(200).json({
      message: "Member deleted successfully",
    });
  }
);

module.exports = {
  getMembersList,
  addNewMember,
  getSingleMember,
  updateMember,
  deleteMember,
};
