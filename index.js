const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const tasks = [
    {id: 1, name: "Task 1", isDone: false}, 
    {id: 2, name: "Task 2", isDone: false}
];

// get Tasks
let taskId = tasks.length
app.get("/tasks", (request, response) => {
    response.json(tasks);
});

app.get("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if(task) {
        response.json(task);
    } else {
        response.status(404).json();
    }
});

// POST new task
app.post("/tasks", (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request, body);
    response.status(201).json();
});

app.put("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex !== -1){
        tasks[taskIndex] = {...tasks[taskIndex], ...request.body};
        response.status(tasks[taskIndex]);
    } else {
        response.status(404).send('Task not found')
    }
});

// patch task
app.patch("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (task) {
        Object.assign(task, request.body);
        response.json(task);
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

// delete task
app.delete("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        response.status(204).send();
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});