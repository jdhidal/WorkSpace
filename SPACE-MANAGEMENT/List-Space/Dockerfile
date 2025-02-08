FROM ruby:3.3.6

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . . 

COPY .env /app/.env

EXPOSE 3005

CMD ["ruby", "app.rb"]

