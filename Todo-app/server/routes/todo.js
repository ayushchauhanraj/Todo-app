const router = require("express").Router();
const handle = require("../handlers");

router.get("/get", handle.getTodo);
router.post("/create", handle.createTodo);
router.delete("/:id", handle.deleteTodo);
router.post("/:id", handle.updateTodo);
module.exports = router;
