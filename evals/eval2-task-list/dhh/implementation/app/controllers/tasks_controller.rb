class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]

  def index
    @tasks = Task.all.order(created_at: :desc)
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      # Turbo will automatically handle the response
      # No need to manually render partials or redirect
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to root_path }
      end
    else
      # Show validation errors inline
      render :index, status: :unprocessable_entity
    end
  end

  def update
    if @task.toggle_completion!
      # Turbo broadcasts handle the UI update automatically
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    # Again, Turbo broadcasts do the work
    head :ok
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title)
  end
end
