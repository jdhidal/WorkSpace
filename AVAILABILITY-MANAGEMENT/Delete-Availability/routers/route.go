package routers

import (
	"availability-management/delete-availability/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// SetupRouter configura las rutas para la API
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Ruta para eliminar disponibilidad por ID
	router.DELETE("/availability/:id", func(c *gin.Context) {
		// Obtener id de los parámetros
		idStr := c.Param("id")

		// Convertir id de string a int
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "El id debe ser un número entero válido",
			})
			return
		}

		// Llamar al modelo para eliminar la disponibilidad
		err = models.DeleteAvailability(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No se pudo eliminar la disponibilidad",
			})
			return
		}

		// Retornar respuesta exitosa
		c.JSON(http.StatusOK, gin.H{
			"message": "Disponibilidad eliminada con éxito",
		})
	})

	return router
}
