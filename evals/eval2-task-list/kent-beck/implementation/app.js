import { TaskList } from './task-list.js';
import { UIController } from './ui-controller.js';

class App {
  constructor() {
    this.taskList = new TaskList();
    this.ui = new UIController(this.taskList);
    this.setupEventListeners();
    this.loadTasks();
    this.ui.render();
  }

  setupEventListeners() {
    const form = document.getElementById('add-task-form');
    const input = document.getElementById('task-input');
    const taskListElement = document.getElementById('task-list');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        this.taskList.addTask(text);
        input.value = '';
        this.saveTasks();
        this.ui.render();
      }
    });

    taskListElement.addEventListener('click', (e) => {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;

      const taskId = parseInt(taskItem.dataset.taskId);
      const task = this.taskList.getTasks().find(t => t.id === taskId);

      if (e.target.type === 'checkbox') {
        if (task.completed) {
          this.taskList.uncompleteTask(task);
        } else {
          this.taskList.completeTask(task);
        }
        this.saveTasks();
        this.ui.render();
      } else if (e.target.classList.contains('delete-btn')) {
        this.taskList.deleteTask(task);
        this.saveTasks();
        this.ui.render();
      } else if (e.target.classList.contains('task-text')) {
        if (task.completed) {
          this.taskList.uncompleteTask(task);
        } else {
          this.taskList.completeTask(task);
        }
        this.saveTasks();
        this.ui.render();
      }
    });
  }

  saveTasks() {
    const tasks = this.taskList.getTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextId', this.taskList.nextId.toString());
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    const savedNextId = localStorage.getItem('nextId');

    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => {
        this.taskList.tasks.push(task);
      });
    }

    if (savedNextId) {
      this.taskList.nextId = parseInt(savedNextId);
    }
  }
}

// Initialize app when DOM is ready
new App();
