package main

import (
	"fmt"
	"log"
	"net/http"
	"reservation_management/cancel-reservation/db"
	"reservation_management/cancel-reservation/resolvers"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar las variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error al cargar el archivo .env: %v", err)
	}

	// Conectar a la base de datos
	db.InitDB()
	defer db.CloseDB()

	// Definir la consulta (Query) con un campo dummy
	query := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"dummy": &graphql.Field{
				Type: graphql.String,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return "dummy", nil
				},
			},
		},
	})

	// Definir la mutación
	mutation := graphql.NewObject(graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"cancelReservation": resolvers.CancelReservationMutation,
		},
	})

	// Crear el esquema de GraphQL
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    query, // Pasamos la consulta con el campo dummy
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
	http.Handle("/cancel-reservation", h)
	fmt.Println("Servidor corriendo en puerto 3011...")
	log.Fatal(http.ListenAndServe(":3011", nil))
}
