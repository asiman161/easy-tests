class AddUserForGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :user_id, :integer, null: false, default: 0
    remove_column :groups, :elder_id
  end
end
