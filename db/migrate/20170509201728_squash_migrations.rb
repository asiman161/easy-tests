class SquashMigrations < ActiveRecord::Migration[5.0]
  def change

    create_table :groups do |t|
      t.string :group_name, null: false
      t.integer :group_age, default: 1
      t.integer :user_id, null: false, default: 0
      t.string :key, null: false, default: 0

      t.timestamps
    end

    create_table :tests do |t|
      t.json :test_data, null: false
      t.integer :time_end, limit: 8, default: 0
      t.boolean :show_test, default: false
      t.integer :user_id, null: false
      t.integer :time, null: false, default: 0
      t.boolean :random_variant, default: false
      t.integer :variants_count, null: false, default: 0
      t.string :test_name, null: false, default: ''
      t.json :answers
      t.integer :test_type, null: false, default: 0
      t.integer :subject_id, null: false

      t.timestamps
    end

    create_table :completed_tests do |t|
      t.string :test_rate, null: false, default: -1
      t.boolean :first_complete, default: false
      t.integer :user_id, null: false
      t.integer :test_id, null: false
      t.text :answers, array: true, default: []
      t.integer :test_type, null: false, default: 0
      t.integer :variant, null: false, default: 0
      t.integer :time, null: false, default: 0
      t.boolean :receive_manual, default: true

      t.integer :group_id
      t.timestamps
    end

    create_table :test_watchers do |t|
      t.integer :variant, null: false
      t.integer :user_id, null: false
      t.integer :test_id, null: false

      t.timestamps
      t.index [:user_id, :test_id], unique: true
    end

    create_table :subjects do |t|
      t.string :subject_name, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    create_table :feedbacks do |t|
      t.text :description, null: false
      t.text :message, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    create_table :groups_users do |t|
      t.integer :group_id
      t.integer :user_id
    end

    create_table :groups_subjects do |t|
      t.integer :group_id
      t.integer :subject_id
    end

    add_index :groups, :key, unique: true
    add_index :completed_tests, [:user_id, :test_id], unique: true
  end
end
