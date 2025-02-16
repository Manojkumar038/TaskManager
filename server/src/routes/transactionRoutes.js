const express = require("express");
const router = express.Router();
const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionsByDate,
} = require("../controllers/transactionController");

router.post("/transactions", addTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:date", getTransactionsByDate);

module.exports = router;
