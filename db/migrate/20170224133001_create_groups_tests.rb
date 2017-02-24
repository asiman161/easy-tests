class CreateGroupsTests < ActiveRecord::Migration[5.0]
  def change
    create_table :groups_tests, id: false do |t|
      t.integer :group_id
      t.integer :test_id
    end
  end
end
