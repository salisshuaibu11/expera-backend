const express = require("express");
const router = express.Router();

const {
  getAllAdmins,
  addNewAdmin,
  updateAdmin,
  getSingleAdmin,
  deleteAdmin,
} = require("../controllers/AdminController.js");

router.route("/").get(getAllAdmins);
router.route("/create-admin").post(addNewAdmin);
router
  .route("/admin/:id")
  .get(getSingleAdmin)
  .put(updateAdmin)
  .delete(deleteAdmin);

module.exports = router;
