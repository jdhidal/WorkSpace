const { Client } = require('soap');
const url = 'http://www.example.com/soap?wsdl'; // URL del servicio SOAP

// Función que consulta el servicio SOAP para eliminar un rol
function deleteRoleSOAP(roleId, callback) {
  Client.createClient(url, (err, client) => {
    if (err) return callback(err, null);

    client.deleteRole({ roleId }, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  });
}

module.exports = { deleteRoleSOAP };

/.