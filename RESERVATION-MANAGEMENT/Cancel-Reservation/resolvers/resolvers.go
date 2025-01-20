package resolvers

import (
	"reservation_management/cancel-reservation/db"
	"reservation_management/cancel-reservation/models"

	"github.com/graphql-go/graphql"
)

// CancelReservationMutation es la mutación para cancelar una reserva
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
		if err := db.DB.First(&reservation, id).Error; err != nil {
			return nil, err
		}

		// Cambiar el estado de la reserva a "cancelada"
		reservation.Status = "cancelada"
		if err := db.DB.Save(&reservation).Error; err != nil {
			return nil, err
		}
		return reservation, nil
	},
}
