class Api::GroupsController < ApplicationController
  before_action :authenticate_user!

  def create
    #TODO: move to model
    if current_user.elder?
      group = Group.new({
        group_name: params[:group_name],
        group_age: params[:group_age],
        key: generate_key,
        elder_id: current_user.id
      })
      group.users << current_user
      if group.save
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
      if group
        group.users << current_user
        if group.save
          render json: {status: 0}
        else
          render json: {status: 3, error: "can't save"}
        end
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

  private

  def generate_key(key_length = 8)
    alphabet = ['a'..'z', '0'..'9'].flat_map { |range| range.to_a }
    key_length.times.map { alphabet[rand(36)] }.join # 36 - alphabet size
  end

end
