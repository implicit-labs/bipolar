export class TaskList {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(text) {
    const task = {
      id: this.nextId++,
      text: text,
      completed: false
    };
    this.tasks.push(task);
    return task;
  }

  getTasks() {
    return this.tasks;
  }

  completeTask(task) {
    this.setTaskCompletion(task, true);
  }

  uncompleteTask(task) {
    this.setTaskCompletion(task, false);
  }

  setTaskCompletion(task, completed) {
    task.completed = completed;
  }

  deleteTask(task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
