const connection = require('../db/connection');

function deleteRole(roleId, callback) {
  const query = 'DELETE FROM roles WHERE id = ?';
  connection.query(query, [roleId], (err, result) => {
    callback(err, result);
  });
}

module.exports = { deleteRole };
