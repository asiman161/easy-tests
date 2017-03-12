class ChangeBindingsCompletedTests < ActiveRecord::Migration[5.0]
  def change
    add_column :completed_tests, :user_id, :integer, null: false
    add_column :completed_tests, :test_id, :integer, null: false

    drop_table :completed_tests_users
  end
end
