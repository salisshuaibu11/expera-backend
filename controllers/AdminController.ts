import express from "express";
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");

// @desc Get all admins
// @route GET /admins => default
// @access Public
const getAllAdmins = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    await Admin.find((err: {}, admins: {}) => {
      if (err) {
        res.json({
          message: "Could not get all the members",
        });
      }
      res.json(admins);
    });
  }
);

// @desc Add new admin
// @route POST /admins/create-admin
// @access Public
const addNewAdmin = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { fullname, email, phone, password } = req.body;

    const ADMIN_EXISTS = await Admin.findOne({ email });

    if (ADMIN_EXISTS) {
      res.status(400);
      throw new Error("Admin with this email already exist");
    }

    const ADMIN = await Admin.create({
      fullname,
      email,
      phone,
      password,
    });

    res.json(ADMIN);
  }
);

// @desc Update an admin
// @route UPDATE /admins/admin/:id
// @access Public
const updateAdmin = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const ID = req.params.id;
    await Admin.findByIdAndUpdate(ID, {
      $set: req.body,
    });

    res.json({
      message: "Admin updated successfully!",
    });
  }
);

// @desc Get a single admin
// @route GET /admins/admin/:id
// @access Public
const getSingleAdmin = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const ID = req.params.id;
    const admin = await Admin.findById(ID);

    res.json(admin);
  }
);

// @desc Delete an admin
// @route DELETE /admins/admin/:id
// @access Public
const deleteAdmin = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const ID = req.params.id;
    await Admin.findByIdAndDelete(ID, (err: any, admin: any) => {
      if (err) {
        res.json({
          message: "Admin not deleted",
        });
      }
      res.json({
        message: "Admin deleted successfully!",
      });
    });
  }
);

module.exports = {
  getAllAdmins,
  addNewAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
