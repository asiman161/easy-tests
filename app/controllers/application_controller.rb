class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  require 'concerns/requst_statuses'
end
