import { test } from 'node:test';
import assert from 'node:assert';
import { TaskList } from './task-list.js';

test('can create a task', () => {
  const list = new TaskList();
  const task = list.addTask('Buy milk');

  assert.strictEqual(task.text, 'Buy milk');
  assert.strictEqual(task.completed, false);
});

test('can retrieve all tasks', () => {
  const list = new TaskList();
  list.addTask('Buy milk');
  list.addTask('Walk dog');

  const tasks = list.getTasks();

  assert.strictEqual(tasks.length, 2);
  assert.strictEqual(tasks[0].text, 'Buy milk');
  assert.strictEqual(tasks[1].text, 'Walk dog');
});

test('can mark task as complete', () => {
  const list = new TaskList();
  const task = list.addTask('Buy milk');

  list.completeTask(task);

  assert.strictEqual(task.completed, true);
});

test('can mark task as incomplete', () => {
  const list = new TaskList();
  const task = list.addTask('Buy milk');

  list.completeTask(task);
  list.uncompleteTask(task);

  assert.strictEqual(task.completed, false);
});

test('can delete a task', () => {
  const list = new TaskList();
  const task1 = list.addTask('Buy milk');
  const task2 = list.addTask('Walk dog');

  list.deleteTask(task1);

  const tasks = list.getTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].text, 'Walk dog');
});

test('tasks have unique IDs', () => {
  const list = new TaskList();
  const task1 = list.addTask('Buy milk');
  const task2 = list.addTask('Walk dog');

  assert.ok(task1.id);
  assert.ok(task2.id);
  assert.notStrictEqual(task1.id, task2.id);
});
