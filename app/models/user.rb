class User < ActiveRecord::Base
  # Include default devise modules.
  # :confirmable, :trackable,
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable,  :validatable,
           :omniauthable
  include DeviseTokenAuth::Concerns::User
end
