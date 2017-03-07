class CreateRates < ActiveRecord::Migration[5.0]
  def change
    create_table :rates do |t|
      t.integer :rate, default: 0
      t.integer :subject_id, null: false
      t.timestamps
    end
  end
end
