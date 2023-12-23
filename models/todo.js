const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Todo", todosSchema);
