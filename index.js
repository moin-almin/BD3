let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

function addNewTask(tasks, taskId, text, priority) {
  let newTask = { taskId, text, priority };
  tasks.push(newTask);
  return tasks;
};

function returnAllTasks() {
  return tasks;
};

function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
};

function updateTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
};

function updateTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
};

function deleteTask(task, taskId) {
  return task.taskId !== taskId;
}

function filterTasksByPriority(task, priority) {
  return task.priority === priority;
}

// Add a Task to the Task List
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addNewTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

// Read All Tasks in the Task List
app.get('/tasks', (req, res) => {
  let result = returnAllTasks();
  res.json({ tasks: result });
});

// Sort Tasks by Priority
app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let result = tasksCopy.sort(sortTasksByPriority);
  res.json({ tasks: result });
});

// Edit Task Priority
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updateTaskPriority(tasks, taskId, priority);
  res.json({ tasks: result });
})

// Edit/Update Task Text
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskText(tasks, taskId, text);
  res.json({ tasks: result });
})

// Delete a Task from the Task List
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => deleteTask(task, taskId));
  let result = tasks;
  res.json({ tasks: result });
})

// Filter Tasks by Priority
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => filterTasksByPriority(task, priority));
  res.json({ tasks: result });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
