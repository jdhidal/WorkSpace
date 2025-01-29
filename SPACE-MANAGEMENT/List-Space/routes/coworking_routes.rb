# routes/coworking_routes.rb
require 'sinatra'
require 'sinatra/activerecord'
require_relative '../models/coworking_space'

class CoworkingRoutes < Sinatra::Base
  get '/coworking_spaces' do
    spaces = CoworkingSpace.get_all_spaces
    spaces.to_json
  end
end