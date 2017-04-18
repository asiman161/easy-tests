class Group < ApplicationRecord
  has_many :users
  belongs_to :user
  has_and_belongs_to_many :users, required: false
  has_and_belongs_to_many :tests
  has_and_belongs_to_many :subjects

  def self.generate_key(key_length = 8)
    alphabet = ["a".."z", "0".."9"].flat_map { |range| range.to_a }
    key_length.times.map { alphabet[rand(36)] }.join # 36 - alphabet size
  end
end
