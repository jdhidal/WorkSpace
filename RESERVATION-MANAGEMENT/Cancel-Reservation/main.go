package main

import (
	"fmt"
	"log"
	"net/http"
	"reservation_management/cancel-reservation/db"
	"reservation_management/cancel-reservation/resolvers"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func main() {
	// Conectar a la base de datos
	db.InitDB()
	defer db.CloseDB()

	// Definir el esquema de GraphQL
	mutation := graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"cancelReservation": resolvers.CancelReservationMutation,
		},
	})

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    nil,
		Mutation: mutation,
	})
	if err != nil {
		log.Fatalf("Error creando el esquema de GraphQL: %v", err)
	}

	// Crear el handler para GraphQL
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	// Levantar el servidor
	http.Handle("/graphql", h)
	fmt.Println("Servidor corriendo en puerto 3011...")
	log.Fatal(http.ListenAndServe(":3011", nil))
}
