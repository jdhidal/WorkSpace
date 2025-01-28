package resolvers

import (
	"reservation_management/create_reservation/db"
	"reservation_management/create_reservation/models"

	"github.com/graphql-go/graphql"
)

// Define el resolver para crear una reserva
var CreateReservationMutation = &graphql.Field{
	Type: graphql.NewObject(graphql.ObjectConfig{
		Name: "CreateReservationResponse",
		Fields: graphql.Fields{
			"success": &graphql.Field{Type: graphql.Boolean},
			"message": &graphql.Field{Type: graphql.String},
		},
	}),
	Args: graphql.FieldConfigArgument{
		"facility_name":    &graphql.ArgumentConfig{Type: graphql.String},
		"user_name":        &graphql.ArgumentConfig{Type: graphql.String},
		"reservation_date": &graphql.ArgumentConfig{Type: graphql.String},
		"status":           &graphql.ArgumentConfig{Type: graphql.String},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		facilityName, _ := params.Args["facility_name"].(string)
		userName, _ := params.Args["user_name"].(string)
		reservationDate, _ := params.Args["reservation_date"].(string)
		status, _ := params.Args["status"].(string)

		// Crear el modelo de reserva
		reservation := models.Reservation{
			FacilityName:    facilityName,
			UserName:        userName,
			ReservationDate: reservationDate,
			Status:          status,
		}

		// Guardar la reserva en la base de datos
		if err := db.DB.Create(&reservation).Error; err != nil {
			return map[string]interface{}{
				"success": false,
				"message": err.Error(),
			}, nil
		}

		return map[string]interface{}{
			"success": true,
			"message": "Reserva creada exitosamente",
		}, nil
	},
}
