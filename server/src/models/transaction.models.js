const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    transactions: [
        {
            amount: { type: Number, required: true },
            desc: { type: String, required: true },
            type: { type: String, enum: ['Income', 'Expense'], required: true },
            category: { 
                type: String, 
                enum: ['Food', 'EMI', 'Fuel', 'Shopping', 'Entertainment', 'Bills', 'Travel', 'Health', 'Education', 'Savings', 'Investment', 'Other'], 
                required: true 
            },
            customCategory: { type: String, required: function() { return this.category === 'Other'; } },
            method: { type: String, enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'], required: true }
        }
    ]
}, { timestamps: true });

const Transactions = mongoose.model('Transactions', transactionSchema);

module.exports = Transactions;
