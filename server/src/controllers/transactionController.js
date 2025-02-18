const Transaction = require("../models/Transaction");

exports.addTransactions = async (req, res) => {
  try {
    const transactions = req.body;

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({ message: "Request body must be a non-empty array of transactions" });
    }

    const transactionDocs = transactions.map(transactionData => {
      const { date, amount, description, category, type, otherType, method } = transactionData;

      if (!date || !amount || !category || !type || !method) {
        throw new Error("All fields are required and description is optional");
      }

      let finalCategory = category;
      if (category === "Other" && !otherType) {
        throw new Error("Please provide 'otherType' value");
      } else if (category === "Other") {
        finalCategory = otherType;
      }

      return { date, amount, description, category: finalCategory, type, method };
    });

    const savedTransactions = await Transaction.insertMany(transactionDocs);

    res.status(201).json({ message: "Transactions added successfully", transactions: savedTransactions });
  } catch (error) {
    if (error.message) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error while adding transactions", error });
    }
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.category === "Other" && !updates.otherType) {
      return res.status(400).json({ message: "Please provide 'otherType' value" });
    }

    if (updates.category === "Other") {
      updates.category = updates.otherType;
    }

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
