package routers

import (
	"availability-management/list-availability/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// SetupRouter configura las rutas para la API
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Ruta para obtener disponibilidades por coworkingSpaceID
	router.GET("/availability/:coworkingSpaceID", func(c *gin.Context) {
		// Obtener coworkingSpaceID de los parámetros
		coworkingSpaceIDStr := c.Param("coworkingSpaceID")

		// Convertir coworkingSpaceID de string a int
		coworkingSpaceID, err := strconv.Atoi(coworkingSpaceIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "ID de coworking no válido",
			})
			return
		}

		// Llamar al modelo para obtener las disponibilidades
		availabilities, err := models.GetAvailabilitiesByCoworkingSpaceID(coworkingSpaceID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No se pudieron obtener las disponibilidades",
			})
			return
		}

		// Retornar la respuesta en formato JSON
		c.JSON(http.StatusOK, availabilities)
	})

	//router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return router
}
