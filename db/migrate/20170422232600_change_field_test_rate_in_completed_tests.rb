class ChangeFieldTestRateInCompletedTests < ActiveRecord::Migration[5.0]
  def change
    change_column :completed_tests, :test_rate, :string, null: false, default: -1
  end
end
