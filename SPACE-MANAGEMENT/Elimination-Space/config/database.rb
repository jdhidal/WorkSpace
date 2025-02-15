require 'pg'
require 'dotenv'

Dotenv.load

DB = PG.connect(
  dbname: ENV['DB_NAME'],
  host: ENV['DB_HOST'],
  user: ENV['DB_USER'],
  password: ENV['DB_PASSWORD'],
  port: ENV['DB_PORT']
)