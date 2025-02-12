package main

import (
	"fmt"
	"log"
	"net/http"
	"reservation_management/create_reservation/db"
	"reservation_management/create_reservation/resolvers" // Importa el paquete resolvers

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	query := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"dummyField": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return "Dummy Data", nil
				},
			},
		},
	})

	mutation := graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"createReservation": resolvers.CreateReservationMutation, // Usar la mutación desde resolvers
		},
	})

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    query,
		Mutation: mutation,
	})
	if err != nil {
		log.Fatalf("Error creando el esquema de GraphQL: %v", err)
	}

	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})
	http.Handle("/create-reservation", h)
	fmt.Println("Servidor corriendo en puerto 3010...")
	log.Fatal(http.ListenAndServe(":3010", nil))
}
