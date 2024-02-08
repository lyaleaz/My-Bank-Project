const express = require("express");
const router = express.Router();
const Bank = require("../model/Bank");
const DataFilter = function (dataBank) {
  return dataBank.then((data) => {
    return {
      amount: data.data.amount,
      category: data.data.category,
      vendor: data.data.vendor,
    };
  });
};
router.get("/", async function (req, res) {
  try {
    const transactions = await Bank.find({});
    res.json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/", function (req, res) {
  const amount = req.body.amount;
  const category = req.body.category;
  const vendor = req.body.vendor;

  console.log(amount, category, vendor);
  const newData = new Bank({
    amount: amount,
    category: category,
    vendor: vendor,
  });
  newData.save();

  res.send(newData);
  console.log(newData);
});
router.get("/breakdown", async (req, res) => {
  try {
    const transactions = await Bank.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.json(transactions);
  } catch (error) {
    console.error("Error retrieving breakdown:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:_id", function (req, res) {
  Bank.find({ name: req.params.vendor }).deleteOne().exec();
  res.send("the data deleted");
});
module.exports = router;
