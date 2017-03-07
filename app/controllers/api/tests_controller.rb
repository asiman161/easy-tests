class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def create_test
    test = Test.new test_data: params[:testData]

    current_user.tests << test if current_user.teacher?

    render json: {status: 0}
  end

  def abc
    params.require(:testData).permit(:title, :variant)
  end
end
