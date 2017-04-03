class Api::SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.teacher?
      render json: {status: 0, data: current_user.subjects.select(:id, :subject_name)}
    end
  end
end
