const Transactions = require("../models/transactions");

exports.updateTransaction = async (req, res) => {
    try {
        const { date, transId, amount, desc, type, method } = req.body;

        const day = await Transactions.findOne({ date });

        if (!day) return res.status(400).json({ message: "No transactions available on this day." });

        const indx = day.transactions.findIndex(transc => transc._id.toString() === transId);

        if (indx === -1) return res.status(404).json({ message: "Transaction not found." });

        await Transactions.updateOne(
            { date, "transactions._id" : transId },
            {
                $set: {
                    "transactions.$.amount": amount,
                    "transactions.$.desc": desc,
                    "transactions.$.type": type,
                    "transactions.$.method": method
                }
            }
        );

        res.status(200).json({ message: "Transaction update successful." });
    } catch (err) {
        res.status(500).json({ message: "Server error." });
        console.log("Error occurred in updateTransaction.js: " + err);
    }
};