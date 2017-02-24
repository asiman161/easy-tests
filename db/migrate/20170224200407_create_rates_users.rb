class CreateRatesUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :rates_users do |t|
      t.integer :rate_id
      t.integer :user_id
    end
  end
end
