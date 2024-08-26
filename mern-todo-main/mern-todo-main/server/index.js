const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

function findIndex(arr, id) {
  return arr.findIndex(i => i.id == id);
}

function deleteItemIndex(arr, id) {
  return arr.filter(i => i.id !== id);
}

app.use(bodyParser.json());
app.use(cors({
  origin: ["https://mern-todo-mayank.vercel.app"],
}));

let todo = [];
let counter = 1;

app.get('/todos', (req, res) => {
  res.status(200).send(todo);
});

app.get('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo[todoIndex]);
});

app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTodo = {
    id: counter++,
    title,
    description,
  };
  
  todo.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todo.length;
  todo = deleteItemIndex(todo, id);

  if (todo.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.status(200).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, description } = req.body;

  if (title) todo[todoIndex].title = title;
  if (description) todo[todoIndex].description = description;

  res.status(200).json(todo);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Route not defined');
});

app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});

module.exports = app;
