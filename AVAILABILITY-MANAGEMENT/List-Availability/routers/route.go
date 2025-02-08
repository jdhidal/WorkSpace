package routers

import (
	"availability-management/list-availability/models"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.GET("/availability/:coworkingSpaceID", func(c *gin.Context) {

		coworkingSpaceIDStr := c.Param("coworkingSpaceID")

		coworkingSpaceID, err := strconv.Atoi(coworkingSpaceIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "ID de coworking no válido",
			})
			return
		}

		availabilities, err := models.GetAvailabilitiesByCoworkingSpaceID(coworkingSpaceID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No se pudieron obtener las disponibilidades",
			})
			return
		}

		c.JSON(http.StatusOK, availabilities)
	})

	//router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return router
}
