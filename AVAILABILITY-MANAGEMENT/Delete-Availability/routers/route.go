package routers

import (
	"availability-management/delete-availability/models"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.DELETE("/delete-availability/:id", func(c *gin.Context) {
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "El id debe ser un número entero válido",
			})
			return
		}

		err = models.DeleteAvailability(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No se pudo eliminar la disponibilidad",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Disponibilidad eliminada con éxito",
		})
	})

	return router
}
