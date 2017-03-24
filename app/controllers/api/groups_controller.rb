class Api::GroupsController < ApplicationController
  before_action :authenticate_user!

  def create
    #TODO: move to model
    if current_user.elder?
      unless current_user.group.blank?
        render json: {status: 9, error: 'group already created'}
        return
      end
      group = Group.new({
        group_name: params[:group_name],
        group_age: params[:group_age],
        key: generate_key,
        elder_id: current_user.id
      })
      group.users << current_user
      current_user.group = group
      if group.save && current_user.save
        render json: {status: 0}
      else
        group[:key] = generate_key(9)
        if group.save
          render json: {status: 0}
        else
          render json: {status: 3, error: "can't save"}
        end
      end
    elsif current_user.student?
      group = Group.find_by(key: params[:group_key])
      if group == nil
        render json: {status: 10, error: 'wrong key'}
        return
      end
      if group && group.users.exclude?(current_user)
        group.users << current_user
        current_user.group = group
        if group.save && current_user.save
          render json: {status: 0}
        else
          render json: {status: 3, error: "can't save"}
        end
      else
        render json: {status: 8, error: 'you already have group'}
      end
    end
  end

  def update
    if current_user.elder?
      #TODO: нужно ли записывать в группу id старосты? подумать
      group = current_user.group
      group[:group_name] = params[:group_name] if params[:group_name].length > 2
      group[:group_age] = params[:group_age] if params[:group_age].length > 0
      group[:key] = generate_key if params[:reset_key]
      if group.save
        render json: {status: 0}
      else
        render json: {status: 3, error: "can't save"}
      end
    end
  end

  def get_key
    if current_user.elder? || current_user.teacher?
      key = if current_user.elder?
              current_user.group[:key]
            else
              current_user[:key]
            end
      render json: {status: 0, key: key}
    else
      render json: {status: 6, error: "you don't have permissions"}
    end
  end

  def reset_key
    if current_user.elder?
      current_user.group[:key] = generate_key
      if current_user.group.save
        render json: {status: 0, key: current_user.group[:key]}
      else
        render json: {status: 3, error: "can't save"}
      end
    elsif current_user.teacher?
      current_user[:key] = generate_key
      if current_user.save
        render json: {status: 0, key: current_user[:key]}
      else
        render json: {status: 3, error: "can't save"}
      end
    else
      render json: {status: 6, error: "you don't have permissions"}
    end
  end

  def add_teacher
    if current_user.elder?
      teacher = User.find_by(key: params[:key])
      if teacher
        if teacher.groups.exclude? current_user.group
          if teacher.groups << current_user.group
            render json: {status: 0}
          else
            render json: {status: 3, error: "can't save"}
          end
        else
          render json: {status: 7, error: "you already have this teacher"}
        end
      end
    end
  end

  private

  def generate_key(key_length = 8)
    alphabet = ["a".."z", "0".."9"].flat_map { |range| range.to_a }
    key_length.times.map { alphabet[rand(36)] }.join # 36 - alphabet size
  end

end
