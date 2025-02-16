const Transactions = require("../models/transactions");

exports.updateTransaction = async (req, res) => {
    try{
        const { date, transId, amount, desc, type, method } = req.body;

        const day = Transactions.findOne({date});

        if(!day) return res.status(400).json({message: "No transactions available on this day."});

        const indx = day.transactions.findIndex(transc => transc._id.toString() == transId);

        await Transactions.updateOne(
            {date, [`transactions._id`]:transId},
            {
                $set: {
                    [`transactions.amount`] : amount,
                    [`transactions.desc`]:desc,
                    [`transactions.type`]:type,
                    [`transactions.method`]:method
                }
            }
        );

        res.status(200).json({message: "Transaction Update successfull."});
    }catch(err) {
        res.status(500).json({message: "Server error."});
        console.log("Error occured from updateController.js.." + err);
    }
}