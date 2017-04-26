class ChangeFieldTypeSecond2 < ActiveRecord::Migration[5.0]
  def change
    change_column :completed_tests, :answers, :text
  end
end
