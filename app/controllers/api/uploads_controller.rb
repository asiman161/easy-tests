class Api::UploadsController < ApplicationController
  def file_upload
    puts params
    render json: {complete: true}
  end
end
