class Api::FeedbacksController < ApplicationController
  before_action :authenticate_user!

  def new
    feedback = Feedback.new(description: params[:description], message: params[:message])
    feedback.user = current_user
    if feedback.save
      render json: {status: 0}
    else
      render json: {status: 3, error: "can't save"}, status: 400
    end
  end
end
