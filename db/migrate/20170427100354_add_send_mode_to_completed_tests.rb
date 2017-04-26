class AddSendModeToCompletedTests < ActiveRecord::Migration[5.0]
  def change
    add_column :completed_tests, :receive_manual, :boolean, default: true
  end
end
