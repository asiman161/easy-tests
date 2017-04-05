class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def create_test
    if current_user.teacher?
    test = Test.new test_data: params[:test_data][:test]
      subject = Subject.find_by id: params[:test_data]['subject_id']
      if subject && subject.user == current_user
        test.subject = subject
        current_user.tests << test
        Group.first.tests << test #TODO: WARNING! IMPORTANT! REMOVE THIS!
        render json: {status: 0}
      else
        render json: {status: 11, error: "you don't have this subject"}
      end
    else
      render json: {status: 6, error: "you don't have permissions"}
    end
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
