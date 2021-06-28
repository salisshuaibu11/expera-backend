const express = require("express");
const router = express.Router();
const {
  getMembersList,
  addNewMember,
  getSingleMember,
  updateMember,
  deleteMember
} = require('../controllers/membersController.js');

router
  .route("/")
  .get(getMembersList);

router
  .route("/create-member")
  .post(addNewMember);

router
  .route("/member/:id")
  .get(getSingleMember)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router;
