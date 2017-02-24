class CreateCompletedTestsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :completed_tests_users do |t|
      t.integer :completed_test_id
      t.integer :user_id
    end
  end
end
