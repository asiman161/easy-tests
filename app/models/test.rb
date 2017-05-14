class Test < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :groups
  belongs_to :subject
  has_many :completed_tests

  TEST_TYPES = [WORK = 0, TEST = 1]

  def self.parse_task(path, user_id, test_type, variants_count = 999)
    user = User.find(user_id)
    if user.role == 3
      require 'yomu'
      test = Yomu.new File.open path
      test = test.text.split("\n")
      test.reject! { |item| item.blank? }
      if test_type == WORK || test_type == TEST
        @user_test = self.parse_work test, variants_count
      else
        return {status: 1, error: "wrong type of test"}
      end
      if @user_test.class == Hash
        require 'json'
        test = Test.new(test_data: @user_test.to_json)
        test.subject = Subject.all.first #TODO: WARNING! IMPORTANT! REMOVE THIS!
        user.tests << test
        if user.save
          return {status: 0}
        else
          return {status: 3, error: "can't save"}
        end
      elsif @user_test == 2
        return {status: 2, error: "wrong format"}
      end
    end
  end

  def self.complete_test(user, test_id, answers, send_mode)
    test = Test.find test_id
    test_watcher = TestWatcher.find_by user_id: user[:id] ,test_id: test_id
    if test[:test_type] == TEST
      @test_rate = self.check_test(test, test_watcher, answers)
    else
      @test_rate = -1
    end
    completed_test = CompletedTest.new(test_rate: @test_rate)
    completed_test.user = user
    completed_test.test = test
    completed_test[:test_type] = test[:test_type]
    completed_test[:answers] = answers.map { |item| item.empty? ? '' : item.to_s}

    completed_test[:variant] = TestWatcher.find_by(user_id: user[:id], test_id: test_id)[:variant]
    completed_test[:receive_manual] = send_mode

    test_watcher = TestWatcher.find_by user_id: user[:id], test_id: test_id
    test_watcher[:updated_at] = Time.now
    if completed_test.save && test_watcher.save
      return {status: 0, rate: @test_rate}
    else
      return {status: 3, error: "can't save"}
    end
  end

  private

  def self.check_test(test, test_watcher, answers)
    test_rate = 0
    test_answers = test[:answers]['answers'][test_watcher[:variant]]
    test_answers.each_with_index do |ta, i|
      test_rate += 1 if (!answers[i].empty? && ta.sort == answers[i].sort) || (ta.empty? && answers[i].empty?)
    end
    test_rate
  end

  #work_data = {
  #  title: '',
  #  variants: [
  #    {
  #      questions: []
  #    }
  #  ]
  #}

  def self.parse_work(arr, variants_count)
    work_data = {}
    work_data[:title] = arr[0]
    work_data[:variants] = []
    variant_number = -1
    for i in 1..arr.length - 1
      case arr[i]
      when /^вариант\s?\d{1,3}$/
        variant_number += 1
        if variants_count > 0
          work_data[:variants] << {questions: []}
          variants_count -= 1
        else
          return work_data
        end
      when /^\d{1,3}\).*/
        work_data[:variants][variant_number][:questions] << arr[i].gsub(/^\d{1,3}\)\s*/, '')
      when /^.*$/
        new_text = work_data[:variants][variant_number][:questions][-1] + arr[i]
        work_data[:variants][variant_number][:questions][-1] = new_text
      else
        return 2
      end
    end
    return work_data
  end

  #model
  #test_data = {
  #  title: '',
  #  variants: [
  #    {
  #      questions: [{
  #        question_text: '',
  #        question_right_answers: [],
  #        question_answers: ['']
  #      }]
  #    }
  #  ]
  #}

  def self.parse_test(arr, variants_count)
    test_data = {}
    test_data[:title] = arr[0]
    test_data[:variants] = []
    variant_number = -1
    question_number = -1
    new_line_index = -1
    for i in 1..arr.length - 1
      case arr[i]
      when /^вариант\s?\d{1,3}$/
        variant_number += 1
        question_number = -1
        answer_number = -1
        if variants_count > 0
          test_data[:variants] << {questions: []}
          variants_count -= 1
        else
          return test_data
        end
      when /^вопрос\s?\d{1,3}\s? .*(:|:\s*)$/
        answer_number = -1
        new_line_index = 0
        test_data[:variants][variant_number][:questions] << {
          question_text: arr[i].gsub(/^\s*?вопрос\s\d{1,3}\s?/, ''),
          question_answers: [],
          question_right_answers: []
        }
      when /^\d{1,3}\).*/
        answer_number += 1
        new_line_index = 1
        test_data[:variants][variant_number][:questions][question_number][:question_answers] << arr[i].gsub(/^\d{1,2}\)\s*/, '')
      when /^.*$/
        if new_line_index == 0
          test_data[:variants][variant_number][:questions].last[:question_text] + arr[i]
        elsif new_line_index == 1
          new_text = test_data[:variants][variant_number][:questions][question_number][:question_answers].last + arr[i]
          test_data[:variants][variant_number][:questions][question_number][:question_answers][-1] = new_text
        end
      else
        return 2
      end
    end
    test_data
  end


end
