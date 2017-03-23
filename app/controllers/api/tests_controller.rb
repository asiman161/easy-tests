class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def create_test
    test = Test.new test_data: params[:testData]
    test.subject = Subject.all.first #TODO: add subject by params
    current_user.tests << test if current_user.teacher?
    Group.first.tests << test if current_user.teacher? #TODO: WARNING! IMPORTANT! REMOVE THIS!
    render json: {status: 0}
  end

  def user_tests
    user_tests = []
    #TODO: need to return only test_data
    if current_user.teacher?
      user_tests = current_user.tests
      render json: {user_tests: user_tests}
    elsif current_user.student? || current_user.elder?
      user_tests = current_user.group.tests
      group_subjects = current_user.group.subjects

      user_completed_tests = []
      current_user.completed_tests.each do |ct|
        user_completed_tests << ct.test.id
      end

      current_tests = []
      completed_tests = []
      group_subjects.each_with_index do |s, i|
        current_tests[i] = {subject_name: s[:subject_name], tests: []}
        completed_tests[i] = {subject_name: s[:subject_name], tests: []}
        user_tests.each do |t|
          if  user_completed_tests.include? t.id
            completed_tests[i][:tests].push({title: t[:test_data]['title'], id: t[:id]}) if s[:id] == t[:subject_id]
          else
            current_tests[i][:tests].push({title: t[:test_data]['title'], id: t[:id]}) if s[:id] == t[:subject_id]
          end
        end
      end
      render json: {current_tests: current_tests, completed_tests: completed_tests}
    end
  end


  def user_test
    if !current_user.completed_tests.find_by(test_id: params[:id]) && params[:variant_number].class == Fixnum
      test = current_user.group.tests.find params[:id]
      test_data = test[:test_data]['variants'][params[:variant_number]]
      if test && test_data
        render json: {status: 0, test_data: test_data, test_title: test[:test_data]['title']}
      else
        render json: {status: 1, error: 'test not found'}
      end
    else
      render json: {status: 2, error: 'test completed'}
    end
  end

  def test_complete
    render json: Test.complete_test(current_user, params[:test_id], params[:answers])
  end
end
