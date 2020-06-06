const mongoose = require("mongoose");
const User = require("./user");
const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  complete: Boolean,
  archive: Boolean,
  title: String,
  label: String,
  discription: String,
  date: {
    type: Date,
  },
});

todoSchema.pre("remove", async function (next) {
  try {
    const user = await User.findById(this.user);
    user.todos = user.todos.filter(
      (todo) => todo._id.toString() !== this._id.toString()
    );
    await user.save();
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model("Todo", todoSchema);
