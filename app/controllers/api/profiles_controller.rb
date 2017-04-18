class Api::ProfilesController < ApplicationController
  def update
    current_user[:first_name] = params[:first_name]
    current_user[:last_name] = params[:last_name]
    current_user[:patronymic] = params[:patronymic]
    current_user[:role] = params[:user_role]
    case current_user[:role]
    when 1
      group = Group.find_by key: params[:group_key]
      if group
        current_user.group = group
        if current_user.save
          render json: {status: 0, data: {role: current_user[:role]}}, status: 200
        end
      else
        render json: {status: 14, error: 'group not found'}, status: 400
      end
    when 2
      group = Group.new
      group[:key] = Group.generate_key
      group[:group_name] = params[:group_name]
      group[:group_age] = params[:group_age]
      group.user = current_user
      current_user.group = group
      if group.save && current_user.save
        render json: {status: 0, data: {role: current_user[:role]}}, status: 200
      else
        render json: {status: 4, error: "cannot create new group or update profile"}, status: 400
      end
    when 3
      current_user[:key] = Group.generate_key
      if current_user.save
        render json: {status: 0, data: {role: current_user[:role]}}, status: 200
      else
        render json: {status: 5, error: "cannot update the profile"}, status: 400
      end
    else
      render json: {status: 15, error: "wrong role"}, status: 400
    end
  end
end
