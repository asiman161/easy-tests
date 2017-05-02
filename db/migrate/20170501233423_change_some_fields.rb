class ChangeSomeFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :tests, :answers
    add_column :tests, :answers, :json
    remove_column :test_watchers, :variant
    add_column :test_watchers, :variant, :integer
  end
end
