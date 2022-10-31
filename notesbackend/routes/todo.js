const express = require("express");
const router = express.Router();
const TodoList = require("../models/Todolist");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middlewares/fetchuser");

function findtask(tasks, id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]._id.toString() === id) {
      return i;
    }
  }
  return null;
}

router.post(
  "/addtodo",
  [
    body("title", "Enter valid title").exists(),
    body("tasks", "It must contain one task").isArray({ min: 1, max: 20 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const { title, tasks } = req.body;
      //if errors then show
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors, success });
      }

      const todolist = new TodoList({
        title: title,
        tasks: tasks,
        user: req.user.id,
      });
      const saved_todolist = await todolist.save();

      success = true;
      res.json({ saved_todolist, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/gettodos", fetchuser, async (req, res) => {
  try {
    const todos = await TodoList.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/gettodo/:id", fetchuser, async (req, res) => {
  try {
    const todo = await TodoList.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/deletetodo/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    todo = await TodoList.findByIdAndDelete(req.params.id);
    success = true;
    res.send({ todo:todo, sucsses: "todo deleted", success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});
router.put("/updatetodo/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);
    const {title,tasks} = req.body
    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    let newTodo = {}

    if (title && body("title", "Enter title").exists()) {
      newTodo.title = title;
    }
    if (tasks && body("tasks", "Enter tasks").exists()) {
      newTodo.tasks = tasks;
    }

    newTodo.date = Date.now()

    todo = await TodoList.findByIdAndUpdate(req.params.id,
      { $set: newTodo },
      { new: false });
    success = true;
    res.send({ todo:todo, sucsses:success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.put("/updatetask/:id/:id2", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);

    let { newtask } = req.body;

    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    let id = req.params.id2;
    const { title, tasks } = todo;

    let taskind = findtask(tasks, id);

    if (taskind !== null) {
      tasks[taskind].task = newtask;
      let newTodo = {
        title: title,
        tasks: tasks,
      };
      todo = await TodoList.findByIdAndUpdate(
        req.params.id,
        { $set: newTodo },
        { new: false }
      );
      success = true;
      res.send({ todo, success: success });
    } else {
      res.send({ success: success, msg: "Task not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE4:delete note using DEL "/api/delete/deletenote".Login required
router.delete("/deletetask/:id/:id2", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);

    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    let id = req.params.id2;
    let { title, tasks } = todo;

    let taskind = findtask(tasks,id)

    if (taskind !== null) {
      tasks = tasks.filter((task)=>{
        return  task._id != id
      })
      let newTodo = {
        title: title,
        tasks: tasks,
      };
      todo = await TodoList.findByIdAndUpdate(
        req.params.id,
        { $set: newTodo },
        { new: false }
      );
      success = true;
      res.send({ newTodo, success: success });
    } else {
      res.send({ success: success, msg: "Task not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


router.put("/changecomplete/:id/:id2", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    let id = req.params.id2;
    const { title, tasks } = todo;

    let taskind = findtask(tasks, id);

    if (taskind !== null) {
      let iscompleted = tasks[taskind].iscompleted;
      if (iscompleted === false) {
        tasks[taskind].iscompleted = true;
        let newTodo = {
          title: title,
          tasks: tasks,
        };
        todo = await TodoList.findByIdAndUpdate(
          req.params.id,
          { $set: newTodo },
          { new: false }
        );
        success = true;
        res.send({ todo, success: success, changedto: "true" });
      } else {
        tasks[taskind].iscompleted = false;
        let newTodo = {
          title: title,
          tasks: tasks,
        };
        todo = await TodoList.findByIdAndUpdate(
          req.params.id,
          { $set: newTodo },
          { new: false }
        );
        success = true;
        res.send({ todo, success: success, changedto: "false" });
      }
    } else {
      res.send({ success: success, msg: "Task not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.put("/changecompletetodo/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let todo = await TodoList.findById(req.params.id);
    if (!todo) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    const { title, tasks,iscompleted } = todo;
    
    const newTodo ={
      title:title,
      tasks:tasks,
      iscompleted:true,
    }
    
    todo = await TodoList.findByIdAndUpdate(
      req.params.id,
      { $set: newTodo },
      { new: false }
    );
    success = true;
    res.send({ todo, success: success });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
