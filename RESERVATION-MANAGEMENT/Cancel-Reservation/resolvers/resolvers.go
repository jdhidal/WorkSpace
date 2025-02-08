package resolvers

import (
	"fmt"
	"reservation_management/cancel-reservation/db"
	"reservation_management/cancel-reservation/models"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
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

func main() {
	// Configurar CORS
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},                   // Permitir el origen http://localhost:3000
		AllowMethods:     []string{"GET", "POST"},                             // Métodos permitidos
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Encabezados permitidos
		AllowCredentials: true,
	}))

	// Definir el esquema de GraphQL
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: nil, // Aquí agregas las consultas si las tienes
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name: "Mutation",
			Fields: graphql.Fields{
				"cancelReservation": CancelReservationMutation,
			},
		}),
	})
	if err != nil {
		fmt.Println("Error al crear el esquema de GraphQL:", err)
		return
	}

	// Crear el manejador GraphQL
	gqlHandler := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	// Configurar el endpoint de GraphQL
	router.POST("/cancel-reservation", gin.WrapH(gqlHandler))

	// Iniciar el servidor en el puerto 3011
	err = router.Run(":3011") // Cambiado a puerto 3011
	if err != nil {
		fmt.Println("Error al iniciar el servidor:", err)
	}
}
