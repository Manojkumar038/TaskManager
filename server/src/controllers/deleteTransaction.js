const Transactions = require("../models/transactions");

exports.deleteTransaction = async (req, res) => {
    try {

        const { date, transId } = req.body;
        const day = await Transactions.findOneAndUpdate(
            {date},
            { $pull: { transactions: { _id: transId } }},
            {new: true}
        );

        if(!day) return res.status(400).json({message: "Invalid date or transId"});

        res.status(200).json({message: "Transaction deleted successfully."});

    }catch(err) {
        res.status(500).json({message: "Server Error occured."});
        console.log("Error occured in deleteTransactions.js file." + err);
    }
}