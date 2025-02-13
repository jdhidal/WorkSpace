# routes/coworking_routes.rb
require 'sinatra'
require 'sinatra/activerecord'
require_relative '../models/coworking_space'

class CoworkingRoutes < Sinatra::Base
  get '/coworking_spaces' do
    response.headers["Access-Control-Allow-Origin"] = "http://44.218.54.250:3000"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    content_type :json
    spaces = CoworkingSpace.get_all_spaces
    spaces.to_json
  end
end