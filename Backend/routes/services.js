const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { name: "Private Cloud Hosting", description: "Secure and scalable cloud solutions." },
    { name: "SAP Services", description: "Implementation, migration, and support." },
    { name: "Data Security", description: "Compliance and advanced protection." }
  ]);
});

module.exports = router;
