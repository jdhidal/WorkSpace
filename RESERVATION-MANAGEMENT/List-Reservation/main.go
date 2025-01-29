package main

import (
	"fmt"
	"log"
	"net/http"
	"reservation-management/list-reservation/db"
	"reservation-management/list-reservation/resolvers" // Importar resolvers

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar variables del archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error al cargar el archivo .env: %v", err)
	}

	// Conectar a la base de datos
	db.InitDB()
	defer db.CloseDB()

	// Definir el esquema de GraphQL
	query := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"listReservations": resolvers.ListReservations, // Resolver para listar las reservaciones
		},
	})

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: query,
	})
	if err != nil {
		log.Fatalf("Error creando el esquema de GraphQL: %v", err)
	}

	// Crear el handler para GraphQL
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	// Levantar el servidor en el puerto 3012
	http.Handle("/graphql", h)
	fmt.Println("Servidor corriendo en puerto 3012...")
	log.Fatal(http.ListenAndServe(":3012", nil))
}
