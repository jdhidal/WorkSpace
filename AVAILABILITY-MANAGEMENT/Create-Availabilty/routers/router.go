package routers

import (
	"availability-management/create-availability/models"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter configura las rutas de la API
func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/availability", func(c *gin.Context) {
		var av models.Availability
		if err := c.ShouldBindJSON(&av); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Verificar si el espacio ya tiene disponibilidad registrada
		if models.CheckSpaceExists(av.CoworkingSpaceID) {
			c.JSON(http.StatusConflict, gin.H{"message": "Este espacio ya tiene disponibilidad registrada"})
			return
		}

		// Crear disponibilidad
		if err := models.CreateAvailability(av); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Disponibilidad creada exitosamente"})
	})

	return r
}
