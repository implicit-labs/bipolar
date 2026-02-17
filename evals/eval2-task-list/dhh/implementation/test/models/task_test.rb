require "test_helper"

class TaskTest < ActiveSupport::TestCase
  test "should not save task without title" do
    task = Task.new
    assert_not task.save, "Saved task without a title"
  end

  test "should save task with title" do
    task = Task.new(title: "Buy milk")
    assert task.save, "Failed to save valid task"
  end

  test "new task should not be completed" do
    task = Task.create!(title: "New task")
    assert_not task.completed, "New task should not be completed"
  end

  test "toggle_completion! should flip completed status" do
    task = Task.create!(title: "Test task")
    assert_not task.completed

    task.toggle_completion!
    assert task.completed

    task.toggle_completion!
    assert_not task.completed
  end

  test "pending scope should return only incomplete tasks" do
    completed = Task.create!(title: "Completed", completed: true)
    pending = Task.create!(title: "Pending", completed: false)

    assert_includes Task.pending, pending
    assert_not_includes Task.pending, completed
  end

  test "completed scope should return only completed tasks" do
    completed = Task.create!(title: "Completed", completed: true)
    pending = Task.create!(title: "Pending", completed: false)

    assert_includes Task.completed, completed
    assert_not_includes Task.completed, pending
  end
end
