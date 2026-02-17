export class UIController {
  constructor(taskList) {
    this.taskList = taskList;
    this.taskListElement = document.getElementById('task-list');
  }

  render() {
    this.taskListElement.innerHTML = '';
    const tasks = this.taskList.getTasks();

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) {
        li.classList.add('completed');
      }
      li.dataset.taskId = task.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;

      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      this.taskListElement.appendChild(li);
    });
  }
}
