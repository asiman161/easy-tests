class AddTimeToCompletedTests < ActiveRecord::Migration[5.0]
  def change
    add_column :completed_tests, :time, :integer, null: false, default: 0
  end
end
