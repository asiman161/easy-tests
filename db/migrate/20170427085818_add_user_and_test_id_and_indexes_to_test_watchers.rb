class AddUserAndTestIdAndIndexesToTestWatchers < ActiveRecord::Migration[5.0]
  def change
    add_column :test_watchers, :user_id, :integer, null: false
    add_column :test_watchers, :test_id, :integer, null: false
    add_index :test_watchers, [:user_id, :test_id], unique: true
  end
end
