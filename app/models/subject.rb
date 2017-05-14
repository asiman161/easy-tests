class Subject < ApplicationRecord
  belongs_to :user
  has_many :test
  has_and_belongs_to_many :groups
end
