const Transactions = require("../models/transactions");

exports.saveTransactions = async (req, res) => {

    try {
        const { date, transactions } = req.body;

        if (!date || !transactions) return res.status(400).json({ message: "Invalid date or input fields.." });

        const day = await Transactions.findOne({ date });

        if (!day) {
            const newTransactions = new Transactions({ date, transactions });
            await newTransactions.save();
        }
        else {
            day.transactions.push(...transactions);
            await day.save();
        }

        res.status(200).json({ message: "Transactions saved successfully." });
    } catch (err) {
        res.status(500).json({message: "Internal server error!"});
        console.log("Error occured in the saveTransaction.js file..." + err);
    }
}





