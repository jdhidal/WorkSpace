require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv'
require 'rack/cors'

Dotenv.load
require_relative './routes/coworking_routes'

use Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '/coworking_spaces',
      headers: :any,
      methods: [:get, :post, :put, :delete, :options],
      credentials: true
  end
end

class GetCoworkingSpaces < Sinatra::Base
  use CoworkingRoutes

  set :port, 3005

  get '/' do
    'API is running!'
  end
end

GetCoworkingSpaces.run!
