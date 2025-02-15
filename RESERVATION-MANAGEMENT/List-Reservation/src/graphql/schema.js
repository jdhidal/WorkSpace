const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Reservation {
    id: Int
    facility_name: String
    user_name: String
    reservation_date: String
    status: String
  }

type Query {
  listReservations: [Reservation]
}

`);

module.exports = { schema };
