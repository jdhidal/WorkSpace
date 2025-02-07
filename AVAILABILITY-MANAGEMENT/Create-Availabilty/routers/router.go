package routers

import (
	"availability-management/create-availability/models"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter configure Routes
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

		if models.CheckSpaceExists(av.CoworkingSpaceID) {
			c.JSON(http.StatusConflict, gin.H{"message": "Space pre-regestry"})
			return
		}

		if err := models.CreateAvailability(av); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Create Availabilty Successfull"})
	})

	return r
}
