class ChangeFieldType2 < ActiveRecord::Migration[5.0]
  def change
    remove_column :completed_tests, :answers
    add_column :completed_tests, :answers, :text, array: true
  end
end
