class CreateFeedbacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feedbacks do |t|
      t.text :description, null: false
      t.text :message, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
