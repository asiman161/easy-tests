class AddKeyToGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :key, :string, null: false, default: 0
    add_index :groups, :key, unique: true
  end
end
