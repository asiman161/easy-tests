class Api::TeachersController < ApplicationController
  def destroy
    if current_user.elder?
      th = User.find(params[:id])
      group = current_user.group
      if th.groups.delete(group) &&
        group.subjects.delete(Subject.where(user_id: th.id)) &&
        group.tests.delete(Test.where(user_id: th.id))
        render json: {status: 0}
      else
        render json: {status: 10, error: "can't delete"}
      end
    end
  end

  def index
    if current_user.student? || current_user.elder?
      group = current_user.group
      teachers = group.users.where(role: 3).select(:id, :first_name, :last_name, :patronymic)
      render json: {status: 0, data: teachers}
    end

  end
end
