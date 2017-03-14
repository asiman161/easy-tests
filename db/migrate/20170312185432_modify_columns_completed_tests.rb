class ModifyColumnsCompletedTests < ActiveRecord::Migration[5.0]
  def change
    remove_column :completed_tests, :time_start
    remove_column :completed_tests, :time_end
    add_column :completed_tests, :subject_id, :boolean, default: false
  end
end
