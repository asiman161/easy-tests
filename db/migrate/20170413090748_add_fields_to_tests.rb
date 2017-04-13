class AddFieldsToTests < ActiveRecord::Migration[5.0]
  def change
    add_column :tests, :test_name, :string, null: false, default: ''
    add_column :tests, :answers, :integer, array: true
    add_column :tests, :test_type, :integer, null: false, default: 0
  end
end
