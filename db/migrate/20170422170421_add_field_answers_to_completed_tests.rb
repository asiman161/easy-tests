class AddFieldAnswersToCompletedTests < ActiveRecord::Migration[5.0]
  def change
    add_column :completed_tests, :answers, :string, array: true, null: false, default: []
    add_column :completed_tests, :test_type, :integer, null: false, default: 0
    add_column :completed_tests, :variant, :integer, null: false, default: 0
    change_column :completed_tests, :test_rate, :string, null: false, default: 0
  end
end
