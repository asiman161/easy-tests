class CreateTestWatchers < ActiveRecord::Migration[5.0]
  def change
    create_table :test_watchers do |t|
      t.string :variant, null: false
      t.timestamps
    end
  end
end
