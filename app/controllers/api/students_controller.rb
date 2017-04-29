class Api::StudentsController < ApplicationController
  before_action :authenticate_user!

  def destroy
    if current_user.elder?
      student = User.find params[:id]
      if student.group == current_user.group
        student[:role] = 0
        student[:group_id] = nil
        if student.save
          render json: {status: 0}
        else
          render json: {status: 10, error: "can't delete"}, status: 400
        end
      end
    end
  end
end
