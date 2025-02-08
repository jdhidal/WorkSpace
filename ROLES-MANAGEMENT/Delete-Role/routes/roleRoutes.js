const express = require('express');
const router = express.Router();
const roleModel = require('../models/roleModel');

// Ruta para eliminar un rol
router.delete('/:roleId', (req, res) => {
  const { roleId } = req.params;

  // Llamada a la base de datos para eliminar el rol
  roleModel.deleteRole(roleId, (err, dbResponse) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el rol en la base de datos' });
    }
    res.status(200).json({ message: 'Rol eliminado exitosamente' });
  });
});

module.exports = router;
