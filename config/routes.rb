Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    post 'uploads', to: 'uploads#file_upload'
    post 'create-test', to: 'tests#create_test'
    get 'user-tests', to: 'tests#user_tests'
  end
end
