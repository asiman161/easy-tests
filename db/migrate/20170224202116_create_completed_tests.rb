class CreateCompletedTests < ActiveRecord::Migration[5.0]
  def change
    create_table :completed_tests do |t|
      t.integer :test_rate, null: false
      t.boolean :first_complete, default: false
      t.integer :time_start, limit: 8, null: false
      t.integer :time_end, limit: 8, null: false
      t.integer :group_id
      t.timestamps
    end
  end
end
