class Api::UploadsController < ApplicationController
  def file_upload
    status = Test.parse_task(
      params[:file].path,
      params[:user_id],
      params[:test_type].to_i,
      params[:variants_count].to_i
    )
    render json: status
  end
end
