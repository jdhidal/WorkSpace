# models/coworking_space.rb
require 'dotenv'
Dotenv.load

class CoworkingSpace < ActiveRecord::Base
  def self.get_all_spaces
    establish_connection(
      adapter: 'postgresql',
      host: ENV['DB_HOST'],
      port: ENV['DB_PORT'],
      database: ENV['DB_NAME'],
      username: ENV['DB_USER'],
      password: ENV['DB_PASSWORD']
    )

    query = "SELECT * FROM get_all_coworking_spaces();"
    connection.execute(query)
  end
end