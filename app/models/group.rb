class Group < ApplicationRecord
  has_many :users
  has_and_belongs_to_many :tests
  has_and_belongs_to_many :subjects
end
