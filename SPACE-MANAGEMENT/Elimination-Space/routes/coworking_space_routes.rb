require 'sinatra'
require_relative '../models/coworking_space'

class CoworkingSpaceRoutes < Sinatra::Base
  delete '/coworking_spaces/:id' do
    id = params[:id].to_i
    CoworkingSpace.delete(id)
    status 204 
  end
end