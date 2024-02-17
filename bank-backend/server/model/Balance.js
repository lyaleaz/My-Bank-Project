var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BalanceSchema = new Schema({
  balance: Number,
});
const BalanceS = mongoose.model("Balance", BalanceSchema);
module.exports = BalanceS;
