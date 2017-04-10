class Api::SubjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user.teacher?
      render json: {status: 0, data: current_user.subjects.select(:id, :subject_name)}
    end
  end

  def create
    if current_user.teacher?
      subject = Subject.new(subject_name: params[:subject_name])
      if current_user.subjects << subject
        render json: {status: 0, data: current_user.subjects}
      else
        render json: {status: 3, error: "can't save"}
      end

    end
  end

  def destroy
    subject = current_user.subjects.find_by(id: params[:id])
    if current_user.teacher? && !subject.nil?
      if subject.delete
        user_subjects = current_user.subjects.select(:id, :subject_name)
        render json: {status: 0, data: user_subjects}
      else
        render json: {status: 10, error: "can't delete"}
      end
    else
      render json: {status: 12, error: "you don't have permissions or wrong subject id"}
    end
  end
end
