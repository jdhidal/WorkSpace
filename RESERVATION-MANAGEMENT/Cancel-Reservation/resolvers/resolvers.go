package resolvers

import (
	"fmt"
	"net/http"
	"reservation_management/cancel-reservation/db"
	"reservation_management/cancel-reservation/models"
	"strconv" // Asegúrate de importar strconv
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
)

// CancelReservationMutation es la mutación para cancelar una reserva y luego eliminarla después de un tiempo
var CancelReservationMutation = &graphql.Field{
	Type: graphql.NewObject(graphql.ObjectConfig{
		Name: "Reservation",
		Fields: graphql.Fields{
			"id":               &graphql.Field{Type: graphql.Int},
			"facility_name":    &graphql.Field{Type: graphql.String},
			"user_name":        &graphql.Field{Type: graphql.String},
			"reservation_date": &graphql.Field{Type: graphql.String},
			"status":           &graphql.Field{Type: graphql.String},
		},
	}),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{Type: graphql.Int},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		id := p.Args["id"].(int)
		var reservation models.Reservation

		// Buscar la reserva por su ID
		if err := db.DB.First(&reservation, id).Error; err != nil {
			return nil, err
		}

		// Cambiar el estado de la reserva a "cancelada"
		reservation.Status = "cancelada"
		if err := db.DB.Save(&reservation).Error; err != nil {
			return nil, err
		}

		// Programar la eliminación de la reserva después de un tiempo (ejemplo: 24 horas)
		go func() {
			// Espera 24 horas antes de eliminar la reserva
			time.Sleep(24 * time.Hour)

			// Eliminar la reserva de la base de datos después del tiempo
			if err := db.DB.Delete(&reservation).Error; err != nil {
				fmt.Printf("Error al eliminar la reserva: %v\n", err)
			} else {
				fmt.Printf("Reserva con ID %d eliminada después de 24 horas.\n", reservation.ID)
			}
		}()

		// Devolver la reserva cancelada
		return reservation, nil
	},
}

// SetupRouter es la función para configurar las rutas y habilitar CORS
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Configuración de CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},                   // Permitir el origen http://localhost:3000
		AllowMethods:     []string{"GET", "POST", "DELETE"},                   // Métodos permitidos
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Encabezados permitidos
		AllowCredentials: true,
	}))

	// Ruta para la mutación de cancelar reserva
	router.POST("/cancel-reservation", func(c *gin.Context) {
		// Lógica para manejar las peticiones GraphQL
	})

	// Ruta para eliminar una reserva (DELETE)
	router.DELETE("/cancel-reservation/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := strconv.Atoi(idStr) // Convertir idStr a un entero
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "El id debe ser un número entero válido",
			})
			return
		}

		var reservation models.Reservation

		// Buscar la reserva por su ID
		if err := db.DB.First(&reservation, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "Reserva no encontrada",
			})
			return
		}

		// Eliminar la reserva
		if err := db.DB.Delete(&reservation).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No se pudo eliminar la reserva",
			})
			return
		}

		// Responder con éxito
		c.JSON(http.StatusOK, gin.H{
			"message": "Reserva eliminada con éxito",
		})
	})

	return router
}
