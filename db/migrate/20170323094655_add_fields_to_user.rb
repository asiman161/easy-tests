class AddFieldsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :key, :string
    add_index :users, :key, unique: true
  end
end
