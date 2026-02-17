require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_url
    assert_response :success
    assert_select "h1", "Tasks"
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { title: "New task" } }
    end

    assert_response :success
  end

  test "should not create task without title" do
    assert_no_difference("Task.count") do
      post tasks_url, params: { task: { title: "" } }
    end

    assert_response :unprocessable_entity
  end

  test "should update task" do
    task = Task.create!(title: "Test task")

    patch task_url(task)
    assert_response :success

    task.reload
    assert task.completed
  end

  test "should destroy task" do
    task = Task.create!(title: "Test task")

    assert_difference("Task.count", -1) do
      delete task_url(task)
    end

    assert_response :success
  end
end
