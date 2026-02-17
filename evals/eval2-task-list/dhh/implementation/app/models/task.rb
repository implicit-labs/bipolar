class Task < ApplicationRecord
  # Validations - keep it simple, keep it obvious
  validates :title, presence: true

  # Scopes for organization
  scope :pending, -> { where(completed: false).order(created_at: :desc) }
  scope :completed, -> { where(completed: true).order(updated_at: :desc) }

  # Broadcasting changes via Turbo Streams
  # This is the magic - every create/update/destroy automatically
  # pushes changes to all connected clients. No JavaScript needed.
  broadcasts_to ->(task) { :tasks }, inserts_by: :prepend

  def toggle_completion!
    update!(completed: !completed)
  end
end
