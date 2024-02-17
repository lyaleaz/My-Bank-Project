const express = require("express");
const router = express.Router();
const Bank = require("../model/Bank");
const Balance = require("../model/Balance");

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
  const date = req.body.date;
  console.log(amount, category, vendor, date);
  const newData = new Bank({
    amount: amount,
    category: category,
    vendor: vendor,
    date: date,
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
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const transactions = await Bank.find({ category: category });
    res.json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:_id", function (req, res) {
  Bank.find({ name: req.params.vendor }).deleteOne().exec();
  res.send("the data deleted");
});
/* router.get("/balance", async (req, res) => {
  Balance.find({}).then(function (balance) {
    res.send(balance);
  });
});
 */
router.put("/balance/:id", async (req, res) => {
  const data = req.body;
  const paramsId = req.params.id;
  const filter = { _id: paramsId };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      balance: data.balance,
    },
  };
  const result = await Balance.updateOne(filter, updateDoc, options);
  res.send(data);
});
router.post("/balance", async (req, res) => {
  try {
    const amount = req.body.amount;
    const balance1 = await Balance.findOne({});
    const total = balance1.balance + amount;
    await Balance.findOneAndUpdate(
      {},
      { $set: { balance: total } },
      { new: true }
    );
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "Not saved! try again!" });
  }
});
router.get("/balance", async (req, res) => {
  try {
    const balanceArr = await Balance.find({});
    if (balanceArr.length == 0) {
      const newBalance = new Balance({ total: 0 });
      const savedNewBalance = await newBalance.save();
      res.status(201).send(savedNewBalance);
    } else {
      const balance = balanceArr[0];
      res.status(200).send(balance);
    }
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});
router.get("/:year/:month", async (req, res) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  try {
    const transactions = await Bank.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, year] },
          { $eq: [{ $month: "$date" }, month] },
        ],
      },
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions by month and year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
