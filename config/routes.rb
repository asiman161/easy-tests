Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    post 'uploads', to: 'uploads#file_upload'
    post 'create-test', to: 'tests#new'
    get 'user-tests', to: 'tests#user_tests'
    post 'user-test/complete', to: 'tests#test_complete'
    post 'user-test/:id', to: 'tests#user_test'
    post 'new-group', to: 'groups#create'
    post 'update-group', to: 'groups#update' #TODO: should be patch
    get 'get-key', to: 'groups#get_key'
    get 'reset-key', to: 'groups#reset_key'
    post 'add-teacher', to: 'groups#add_teacher'
    post 'group_subjects/:id', to: 'groups#remove_subject' #TODO: should be delete
    get 'groups', to: 'groups#index'
    delete 'groups/:id', to: 'groups#destroy'
    patch 'groups/:id', to: 'groups#add_subject'
    delete 'teachers/:id', to: 'teachers#destroy'
    get 'teachers', to: 'teachers#index'
    get 'subjects', to: 'subjects#index'
    post 'subjects', to: 'subjects#create'
    delete 'subjects/:id', to: 'subjects#destroy'
    patch 'profiles', to: 'profiles#update'
  end
end
