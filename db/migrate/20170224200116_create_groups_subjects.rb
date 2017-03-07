class CreateGroupsSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :groups_subjects do |t|
      t.integer :group_id
      t.integer :subject_id
    end
  end
end
