class Rate < ApplicationRecord
  belongs_to :user, required: false
  belongs_to :subject
  has_and_belongs_to_many :subjects
end
