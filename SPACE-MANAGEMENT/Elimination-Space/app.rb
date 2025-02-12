require 'sinatra'
require 'sinatra/json'
require 'dotenv'
require 'rack/cors'
require_relative './config/database'


Dotenv.load
require_relative './routes/coworking_space_routes'

use Rack::Cors do
  allow do
    origins 'http://44.218.54.250:3000'
    resource '*',
    headers: :any,
    methods: [:delete],
    credentials: true
  end
end


use CoworkingSpaceRoutes

set :port, 3006
set :bind, '0.0.0.0'

get '/' do
  'Elimination-Space API use Instances AWS 2'
end