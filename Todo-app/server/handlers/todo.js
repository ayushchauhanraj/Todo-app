const db = require("../models");
exports.createTodo = async (req, res, next) => {
  const { id } = req.decoded;
  const { title, label, complete, archive, discription, date } = req.body;

  try {
    const user = await db.User.findById(id);

    const todo = await db.Todo.create({
      user,
      title,
      label,
      complete,
      archive,
      discription,
      date,
    });
    //console.log(todo);
    user.todos.push(todo._id);

    await user.save();
    return res.status(201).json({ ...todo._doc });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};
exports.getTodo = async (req, res, next) => {
  //console.log("inside");
  const { id } = req.decoded;
  try {
    const user = await db.User.findById(id).populate("todos");

    return res.status(200).json(user.todos);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  const { id: todoId } = req.params;
  const { id: userId } = req.decoded;
  try {
    let user = await db.User.findById(userId);

    if (user.todos) {
      user.todos = user.todos.filter((usertodo) => {
        return usertodo._id.toString() !== todoId.toString();
      });
    }

    const todo = await db.Todo.findById(todoId);
    if (!todo) throw new Error("No todo found");
    if (todo.user.toString() !== userId) {
      throw new Error("Unauthorized access");
    }
    await user.save();
    await todo.remove();
    this.getTodo(req, res);
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  const { id: userId } = req.decoded;
  const { id: todoId } = req.params;
  try {
    const { title, label, complete, archive, discription, date } = req.body;

    const todo = await db.Todo.findOneAndUpdate(
      { user: userId, _id: todoId },
      {
        $set: {
          title,
          label,
          complete,
          archive,
          discription,
          date,
        },
      },
      { new: true }
    );
    this.getTodo(req, res);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};
