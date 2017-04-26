class ChangeFieldTypeSecond < ActiveRecord::Migration[5.0]
  def change
    change_column :tests, :answers, :text
  end
end
