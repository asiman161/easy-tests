class CreateTests < ActiveRecord::Migration[5.0]
  def change
    create_table :tests do |t|
      t.json :test_data, null: false
      t.integer :time_end, limit: 8, default: 0
      t.boolean :show_test, default: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
