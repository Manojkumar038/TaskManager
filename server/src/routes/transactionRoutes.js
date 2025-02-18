const express = require("express");
const router = express.Router();
const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionsByDate,
} = require("../controllers/transactionController");

router.post("/", addTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);
router.get("/", getAllTransactions);
router.get("/:date", getTransactionsByDate);

module.exports = router;
