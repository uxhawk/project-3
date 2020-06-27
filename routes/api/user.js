const router = require("express").Router();
const userFinancials = require("../../controllers/userFinancialController");

// Matches with "/api/books"
// router.route("/")
//   .get(userFinancials.findAll)
//   .post(userFinancials.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(userFinancials.findById)
//   .put(userFinancials.update)
//   .delete(userFinancials.remove);

module.exports = router;
