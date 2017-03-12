class Subject < ApplicationRecord
  belongs_to :user
  has_many :test
  has_many :rates
  has_and_belongs_to_many :groups
end
