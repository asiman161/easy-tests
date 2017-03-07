class CreateSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :subjects do |t|
      t.string :subject_name, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
