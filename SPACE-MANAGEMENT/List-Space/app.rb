require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv'
require 'rack/cors'

Dotenv.load
require_relative './routes/coworking_routes'

use Rack::Cors do
  allow do
    origins 'http://44.218.54.250:3000'
    resource '/coworking_spaces',
      headers: :any,
      methods: [:get, :post, :put, :delete, :options],
      credentials: true
  end
end

class GetCoworkingSpaces < Sinatra::Base
  use CoworkingRoutes

  set :port, 3005
  set :bind, '0.0.0.0'

  get '/' do
    'API is running succesfull now Instance AWS 2!'
  end
end

GetCoworkingSpaces.run!
