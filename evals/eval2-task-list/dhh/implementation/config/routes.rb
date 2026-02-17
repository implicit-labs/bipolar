Rails.application.routes.draw do
  # The root of the application - just show tasks
  root "tasks#index"

  # RESTful routes for tasks
  resources :tasks, only: [:create, :update, :destroy]
end
