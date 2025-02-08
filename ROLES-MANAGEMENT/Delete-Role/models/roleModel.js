const connection = require('../db/connection');

// Función para borrar un rol
function deleteRole(roleId, callback) {
  const query = 'DELETE FROM roles WHERE id = ?';
  connection.query(query, [roleId], (err, result) => {
    callback(err, result);
  });
}

module.exports = { deleteRole };
