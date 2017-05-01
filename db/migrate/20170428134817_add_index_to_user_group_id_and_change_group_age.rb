class AddIndexToUserGroupIdAndChangeGroupAge < ActiveRecord::Migration[5.0]
  def change
    change_column :groups, :group_age, :integer, default: 0
    add_index :users, :group_id
  end
end
