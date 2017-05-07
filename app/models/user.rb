class User < ActiveRecord::Base
  # Include default devise modules.
  # :confirmable, :trackable,
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable,
    :omniauthable
  include DeviseTokenAuth::Concerns::User

  ROLES = [STUDENT = 1, ELDER = 2, TEACHER = 3]

  belongs_to :group, required: false
  has_and_belongs_to_many :groups, required: false
  has_many :tests
  has_many :subjects
  has_many :test_watchers
  has_many :rates
  has_many :completed_tests
  has_many :feedbacks

  def student?
    role == STUDENT
  end

  def elder?
    role == ELDER
  end

  def teacher?
    role == TEACHER
  end

end
