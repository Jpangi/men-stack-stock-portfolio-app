const mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
    tickerSymbol: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    sharesOwned:{
        type: Number,
        required: true
    },
    purchasePrice:{
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    }

})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    stocks: [stockSchema]
})

const User = mongoose.model("User", userSchema)


module.exports = User;
