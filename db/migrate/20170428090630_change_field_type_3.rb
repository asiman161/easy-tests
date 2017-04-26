class ChangeFieldType3 < ActiveRecord::Migration[5.0]
  def change
    change_column :completed_tests, :answers, :text, array: true, deafult: []
  end
end
