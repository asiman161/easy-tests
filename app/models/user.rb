class User < ActiveRecord::Base
  # Include default devise modules.
  # :confirmable, :trackable,
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable,  :validatable,
           :omniauthable
  include DeviseTokenAuth::Concerns::User

  ROLES = [TEACHER = 3, STUDENT = 2]

  belongs_to :group, required: false
  belongs_to :group, required: false
  has_many :tests
  has_many :rates
  has_and_belongs_to_many :users
  has_and_belongs_to_many :subjects
  has_and_belongs_to_many :completed_tests

  def teacher?
    role == TEACHER
  end
end
