const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const todos = await Todo.find({})
  const count = todos.length
  await setAsync("added_todos", count)
  res.send(todo);
});

router.get('/statistics', async (_, res) => {
  const count = await getAsync("added_todos")
  const added_todos = {
    "added_todos" : Number(count)
  }
  res.send(added_todos);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200)
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  res.send(todo).status(200)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  update = {
    text: req.body.text,
    done: req.body.done
  }
  const updatedTodo = await req.todo.updateOne(update)
  res.send(updatedTodo).status(200)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
