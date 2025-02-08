package resolvers

import (
	"log"
	"reservation-management/list-reservation/db"
	"reservation-management/list-reservation/models"

	"github.com/graphql-go/graphql"
)

// ListReservations resolver para obtener todas las reservaciones
var ListReservations = &graphql.Field{
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "Reservation",
		Fields: graphql.Fields{
			"id":               &graphql.Field{Type: graphql.Int},
			"facility_name":    &graphql.Field{Type: graphql.String},
			"user_name":        &graphql.Field{Type: graphql.String},
			"reservation_date": &graphql.Field{Type: graphql.String},
			"status":           &graphql.Field{Type: graphql.String},
		},
	})),

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var reservations []models.Reservation
		err := db.DB.Find(&reservations).Error
		if err != nil {
			log.Printf("Error al obtener las reservaciones: %v", err)
			return nil, err
		}
		return reservations, nil
	},
}
