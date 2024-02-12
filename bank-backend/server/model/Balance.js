var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BalanceSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
});
const BalanceS = mongoose.model("Balance", BalanceSchema);
module.exports = BalanceS;
