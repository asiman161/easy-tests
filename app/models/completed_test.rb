class CompletedTest < ApplicationRecord
  #TODO: remove group_id from database bcs it's doesn't need
  belongs_to :user
  belongs_to :test

  #serialize :answers
end
