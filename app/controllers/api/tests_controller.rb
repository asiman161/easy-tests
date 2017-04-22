class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def new
    if current_user.teacher?
      test = Test.new
      test[:test_name] = params[:test_data][:title]
      test[:test_data] = params[:test_data]
      test[:test_type] = params[:test_type]
      subject = Subject.find_by id: params[:subject_id]
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
    groups = current_user.groups.select(:id, :group_name, :group_age, :user_id).map do |gr|
      u = gr.user
      {
        id: gr[:id],
        subjects: gr.subjects.select(:id, :subject_name),
        group_name: gr[:group_name],
        group_age: gr[:group_age],
        first_name: u[:first_name],
        last_name: u[:last_name],
        patronymic: u[:patronymic]
      }
    end

    user_tests = []
    #TODO: need to return only test_data
    if current_user.teacher?
      tests = current_user.groups.select(:id, :group_name).map do |gr|
        {
          id: gr[:id],
          group_name: gr[:group_name],
          subjects: gr.subjects.where(user_id: current_user.id).select(:id, :subject_name).map do |sbj|
            {
              id: sbj[:id],
              subject_name: sbj[:subject_name],
              tests: Test.where(subject_id: sbj[:id]).select(:id, :test_name).map do |t|
                completed_tests = CompletedTest.where(test_id: t[:id]).select(:user_id, :test_rate)
                completed_tests_users = []
                completed_tests_rates = []
                completed_tests.each do |d|
                  completed_tests_users.push d[:user_id]
                  completed_tests_rates.push d[:test_rate]
                end
                {
                  id: t[:id],
                  test_name: t[:test_name],
                  users: User.where(id: completed_tests_users, group_id: gr[:id]).select(:id, :first_name, :last_name).map.with_index do |u, i|
                    {
                      id: u[:id],
                      first_name: u[:first_name],
                      last_name: u[:last_name],
                      test_rate: completed_tests_rates[i]
                    }
                  end
                }
              end
            }
          end
        }
      end

      render json: {
        status: 0,
        data: {tests: tests}
      }
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
          if user_completed_tests.include? t.id #TODO: fix n+1
            rate = CompletedTest.find_by(test_id: t.id, user_id: current_user[:id])[:test_rate]
            completed_tests[i][:tests].push({title: t[:test_name], rate: rate, id: t[:id]}) if s[:id] == t[:subject_id]
          else
            current_tests[i][:tests].push({title: t[:test_name], id: t[:id]}) if s[:id] == t[:subject_id]
          end
        end
      end
      render json: {status: 0, data: {
        current_tests: current_tests,
        completed_tests: completed_tests}
      }
    end
  end


  def user_test
    if !current_user.completed_tests.find_by(test_id: params[:id]) && params[:variant_number].class == Fixnum
      test = current_user.group.tests.find params[:id]

      test_data = test[:test_data]['variants'][params[:variant_number]]
      if test && test_data

        render json: {status: 0, test_data: test_data, test_type: test[:test_type]}
      else
        render json: {status: 1, error: 'test not found'}
      end
    else
      render json: {status: 2, error: 'test completed'}
    end
  end

  def test_complete
    render json: Test.complete_test(current_user, params[:id], params[:answers])
  end

  def test_get_completed
    if current_user.teacher?
      test = Test.find params[:test_id]
      student = User.find params[:user_id] if test
      if current_user.groups.ids.include? student.group[:id]
        ct = CompletedTest.find_by test_id: params[:test_id], user_id: params[:user_id]
        render json: {status:0, data: {
          test_name: test[:test_name],
          test_rate: ct[:test_rate],
          first_complete: ct[:first_complete],
          answers: ct[:answers],
          test_type: ct[:test_type],
          variant: ct[:variant],
          questions: test[:test_data]["variants"][ct[:variant]]["questions"]
        }}
      end
    end
  end

  def test_set_rate
    if current_user.teacher?
      test = Test.find params[:test_id]
      student = User.find params[:user_id] if test
      if current_user.groups.ids.include? student.group[:id]
        ct = CompletedTest.find_by test_id: params[:test_id], user_id: params[:user_id]
        ct[:test_rate] = params[:rate]
        if ct.save
          render json: {status: 0}
        else
          render json: {status: 3, error: "can't save"}, status: 400
        end
      end
    end
  end


end
