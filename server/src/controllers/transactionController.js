const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const { date, amount, description, type, otherType, method } = req.body;

    if (!date || !amount || !description || !type || !method) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (type === "Other" && !otherType) {
      return res.status(400).json({ message: "Please provide 'otherType' value" });
    }

    const transaction = new Transaction({ date, amount, description, type, otherType, method });
    await transaction.save();

    res.status(201).json({ message: "Transaction added successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error while adding transaction", error });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating transaction", error });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting transaction", error });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error while retrieving all transactions", error });
  }
};

exports.getTransactionsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const transactions = await Transaction.find({ date });

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this date" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error while retrieving transactions by date", error });
  }
};
