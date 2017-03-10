class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def create_test
    test = Test.new test_data: params[:testData]
    current_user.tests << test if current_user.teacher?

    render json: {status: 0}
  end

  def user_tests
    #TODO: need to return only test_data
    render json: {user_tests: current_user.tests}
  end
end
