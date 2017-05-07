class ChangeDefaultGroupAge < ActiveRecord::Migration[5.0]
  def change
    change_column :groups, :group_age, :integer, default: 1
  end
end
