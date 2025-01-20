package resolvers

import (
	"reservation_management/create_reservation/db"
	"reservation_management/create_reservation/models"

	"github.com/graphql-go/graphql"
)

var CreateReservationMutation = &graphql.Field{
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
		"facility_name":    &graphql.ArgumentConfig{Type: graphql.String},
		"user_name":        &graphql.ArgumentConfig{Type: graphql.String},
		"reservation_date": &graphql.ArgumentConfig{Type: graphql.String},
		"status":           &graphql.ArgumentConfig{Type: graphql.String},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		reservation := &models.Reservation{
			FacilityName:    p.Args["facility_name"].(string),
			UserName:        p.Args["user_name"].(string),
			ReservationDate: p.Args["reservation_date"].(string),
			Status:          p.Args["status"].(string),
		}

		// Guardar la reserva en la base de datos
		if err := db.DB.Create(reservation).Error; err != nil {
			return nil, err
		}
		return reservation, nil
	},
}
