class Api::UploadsController < ApplicationController
  def file_upload
    require 'yomu'
    x = Yomu.new File.open(params[:file].path)
    puts x.text
  end
end
