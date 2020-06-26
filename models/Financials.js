// financial transactions model for trends and charts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialsSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Financials = mongoose.model("Financials", financialsSchema);

module.exports = Financials;