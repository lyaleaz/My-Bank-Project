var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BankSchema = new Schema({
  amount: Number,
  category: String,
  vendor: String,
  date: Date,
});
const BankS = mongoose.model("Bank", BankSchema);
module.exports = BankS;
