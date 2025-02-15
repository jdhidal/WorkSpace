# models/coworking_space.rb
require 'dotenv'
Dotenv.load

class CoworkingSpace < ActiveRecord::Base
  def self.get_all_spaces
    # Establecer la conexión a la base de datos una sola vez
    ActiveRecord::Base.establish_connection(
      adapter: 'postgresql',
      host: ENV['DB_HOST'],
      port: ENV['DB_PORT'],
      database: ENV['DB_NAME'],
      username: ENV['DB_USER'],
      password: ENV['DB_PASSWORD']
    )

    query = "SELECT * FROM get_all_coworking_spaces();"
    result = ActiveRecord::Base.connection.execute(query)

    # Convert in format successful
    result.map do |row|
      {
        id: row['id'],
        name: row['name'],
        description: row['description'],
        photo: row['photo']
      }
    end
  end
end
