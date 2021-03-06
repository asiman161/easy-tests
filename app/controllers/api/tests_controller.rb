class Api::TestsController < ApplicationController
  before_action :authenticate_user!

  def new
    if current_user.teacher?
      test = Test.new
      test[:test_name] = params[:test_data][:title]
      test[:time] = params[:test_data][:time]
      test[:random_variant] = params[:test_data][:random_variant]
      test[:test_data] = params[:test_data]
      test[:test_type] = params[:test_type]
      test[:variants_count] = params[:test_data][:variants].length
      if test[:test_type] != 0
        test[:answers] = {answers: params[:test_data][:variants].map do |v|
          v[:questions].map {|q| q[:question_right_answers]}
        end}
        test[:test_data]['variants'] = params[:test_data][:variants].map do |v|
          {questions: v[:questions].map do |q|
            q.delete :question_right_answers
            q
          end}
        end
      end

      subject = Subject.find_by id: params[:subject_id]
      if subject && subject.user == current_user
        test.subject = subject
        current_user.tests << test
        render json: {status: 0}
      else
        render json: {status: 11, error: "you don't have this subject"}
      end
    else
      render json: {status: 6, error: "you don't have permissions"}
    end
  end

  def test_variants_mode
    if current_user.student? || current_user.elder?
      test = Test.find params[:id]
      if TestWatcher.find_by user_id: current_user[:id], test_id: params[:id]
        render json: {status: 0, data: {started: true, name: test[:test_name]}}
      else
        test_variants(test)
      end

    end
  end

  def test_variants(test)
    if test[:random_variant] || test[:variants_count] > 0
      render json: {status: 0, data: {
        variants: test[:random_variant] ? "random" : test[:variants_count],
        name: test[:test_name],
        time: test[:time]
      }}
    else
      render json: {status: 16, error: "error"}, status: 400
    end
  end

  def user_test
    if !current_user.completed_tests.find_by(test_id: params[:id])
      test_watcher = TestWatcher.find_by user_id: current_user[:id], test_id: params[:id]
      test = Test.find params[:id]
      variant = if test_watcher.nil?
                  test_watcher = TestWatcher.new user_id: current_user[:id], test_id: params[:id]
                  if test[:random_variant]
                    test_watcher[:variant] = Random.rand 0..test[:variants_count] - 1
                  else
                    test_watcher[:variant] = params[:variant_number]
                  end
                else
                  test_watcher[:variant].to_i
                end
      test_data = test[:test_data]['variants'][variant]

      if test_data && test[:show_test] && current_user.group.subjects.ids.include?(test[:subject_id])
        test_watcher.save! if test_watcher[:created_at].nil?
        render json: {status: 0, test_data: test_data, test_type: test[:test_type], time: test[:time], variant: variant}
      else
        render json: {status: 1, error: 'test not found'}, status: 404
      end
    else
      render json: {status: 2, error: 'test completed'}, status: 400
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
    #TODO: fix n + 1
=begin
    replace it with this sql:
    SELECT group_name, subject_name, test_name, test_rate, first_name FROM groups
      JOIN subjects on subjects.user_id = 4
      JOIN users ON groups.id = users.group_id
      JOIN tests ON tests.subject_id = subjects.id
      JOIN completed_tests AS ct ON ct.user_id = users.id AND ct.test_id = tests.id
=end
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
      group_subjects = current_user.group.subjects
      user_tests = group_subjects.flat_map do |s|
        Test.where subject_id: s.id
      end


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
            current_tests[i][:tests].push({title: t[:test_name], id: t[:id]}) if t[:show_test] && s[:id] == t[:subject_id]
          end
        end
      end
      render json: {status: 0, data: {
        current_tests: current_tests,
        completed_tests: completed_tests}
      }
    end
  end

  def test_complete
    render json: Test.complete_test(current_user, params[:id], params[:answers], params[:send_mode])
  end

  def test_get_completed
    if current_user.teacher?
      test = Test.find params[:test_id]
      student = User.find params[:user_id] if test
      if current_user.groups.ids.include? student.group[:id]
        tw = TestWatcher.find_by user_id: params[:user_id], test_id: params[:test_id]
        ct = CompletedTest.find_by user_id: params[:user_id], test_id: params[:test_id]
        render json: {status: 0, data: {
          test_name: test[:test_name],
          rate: ct[:test_rate],
          test_time: test[:time],
          time: (tw[:updated_at] - tw[:created_at]).round,
          first_complete: ct[:first_complete],
          answers: ct[:answers],
          type: ct[:test_type],
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

  def teacher_tests
    if current_user.teacher?
      tests = current_user.subjects.select(:id, :subject_name).map do |s|
        {
          id: s[:id],
          subject_name: s[:subject_name],
          tests: Test.where(subject_id: s[:id]).select(:id, :test_name, :show_test, :test_type)
        }
      end
      render json: {status: 0, data: tests}
    end
  end

  def test_visibility
    test = Test.find params[:id]
    if test[:user_id] == current_user[:id]
      test[:show_test] = !params[:show_test]
      if test.save
        render json: {status: 0}

      end
    end
  end

  def get_result
      ct = CompletedTest.find_by(user_id: current_user[:id], test_id: params[:id])
      name = !ct.nil? ? Test.find(params[:id])[:test_name] : false
      if name
        render json: {status: 0, data: {
          rate: ct[:test_rate],
          variant: ct[:variant],
          type: ct[:test_type],
          name: name
        }}
      end
  end

  def destroy
    if Test.find(params[:id])[:user_id] == current_user[:id]
      if Test.delete(params[:id]) && CompletedTest.delete(CompletedTest.where test_id: params[:id])
        render json: {status: 0}
      end
    end
  end
end
