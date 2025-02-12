const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Reservation {
    id: Int
    facility_name: String
    user_name: String
    reservation_date: String
    status: String
  }

  input ReservationInput {
    facility_name: String!
    user_name: String!
    reservation_date: String!
    status: String!
  }

  type Mutation {
    createReservation(input: ReservationInput): Reservation
  }

  type Query {
    _empty: String
  }
`);
