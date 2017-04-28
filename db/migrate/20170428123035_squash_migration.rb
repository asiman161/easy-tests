class SquashMigration < ActiveRecord::Migration[5.0]
  def change
    create_table :test_watchers do |t|
      t.string :variant, null: false
      t.integer :user_id, null: false
      t.integer :test_id, null: false

      t.timestamps
      t.index [:user_id, :test_id], unique: true
    end

    create_table :groups_users do |t|
      t.integer :group_id
      t.integer :user_id
    end

    drop_table :completed_tests_users

    add_column :users, :key, :string
    add_index :users, :key, unique: true

    remove_column :groups, :elder_id
    add_column :groups, :user_id, :integer, null: false, default: 0
    add_column :groups, :key, :string, null: false, default: 0
    add_index :groups, :key, unique: true

    add_column :tests, :time, :integer, null: false, default: 0
    add_column :tests, :random_variant, :boolean, default: false
    add_column :tests, :variants_count, :integer, null: false, default: 0
    add_column :tests, :test_name, :string, null: false, default: ''
    add_column :tests, :answers, :integer, array: true
    add_column :tests, :test_type, :integer, null: false, default: 0
    add_column :tests, :subject_id, :integer, null: false

    remove_column :completed_tests, :time_start
    remove_column :completed_tests, :time_end
    add_column :completed_tests, :user_id, :integer, null: false
    add_column :completed_tests, :test_id, :integer, null: false
    add_column :completed_tests, :answers, :text, array: true, deafult: []
    add_column :completed_tests, :test_type, :integer, null: false, default: 0
    add_column :completed_tests, :variant, :integer, null: false, default: 0
    add_column :completed_tests, :time, :integer, null: false, default: 0
    add_column :completed_tests, :receive_manual, :boolean, default: true
    change_column :completed_tests, :test_rate, :string, null: false, default: -1
    add_index :completed_tests, [:user_id, :test_id], unique: true
  end
end
