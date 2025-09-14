const express = require("express");
const { registerCompanyAdmin, loginCompanyAdmin } = require("../controllers/company.controller");
const router = express.Router();

router.post("/register", registerCompanyAdmin);
router.post("/login", loginCompanyAdmin);

module.exports = router;
