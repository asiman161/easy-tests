class Group < ApplicationRecord
  has_many :users
  belongs_to :user
  has_and_belongs_to_many :users, required: false
  has_and_belongs_to_many :tests
  has_and_belongs_to_many :subjects
end
