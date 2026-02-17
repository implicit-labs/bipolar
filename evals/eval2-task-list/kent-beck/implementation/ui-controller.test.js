import { test } from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { UIController } from './ui-controller.js';
import { TaskList } from './task-list.js';

function setupDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <form id="add-task-form">
          <input type="text" id="task-input">
        </form>
        <ul id="task-list"></ul>
      </body>
    </html>
  `);
  global.document = dom.window.document;
  global.window = dom.window;
  return dom;
}

test('renders tasks to DOM', () => {
  setupDOM();
  const taskList = new TaskList();
  const ui = new UIController(taskList);

  taskList.addTask('Buy milk');
  taskList.addTask('Walk dog');
  ui.render();

  const items = document.querySelectorAll('.task-item');
  assert.strictEqual(items.length, 2);
});

test('renders completed tasks with completed class', () => {
  setupDOM();
  const taskList = new TaskList();
  const ui = new UIController(taskList);

  const task = taskList.addTask('Buy milk');
  taskList.completeTask(task);
  ui.render();

  const item = document.querySelector('.task-item');
  assert.ok(item.classList.contains('completed'));
});
