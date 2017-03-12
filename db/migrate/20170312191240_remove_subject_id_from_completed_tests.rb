class RemoveSubjectIdFromCompletedTests < ActiveRecord::Migration[5.0]
  def change
    remove_column :completed_tests, :subject_id
  end
end
