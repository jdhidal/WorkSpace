# app.rb
require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv'
Dotenv.load

require_relative './routes/coworking_routes'

class GetCoworkingSpaces < Sinatra::Base
  use CoworkingRoutes

  set :port, 3005

  get '/' do
    'API is running!'
  end
end

GetCoworkingSpaces.run!