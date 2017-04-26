class AddTimeAndRandomVariantToTests < ActiveRecord::Migration[5.0]
  def change
    add_column :tests, :time, :integer, null: false, default: 0
    add_column :tests, :random_variant, :boolean, default: false
    add_column :tests, :variants_count, :integer, null: false, default: 0
  end
end
