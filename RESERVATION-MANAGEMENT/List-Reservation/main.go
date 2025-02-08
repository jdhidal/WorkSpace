package main

import (
	"fmt"
	"log"

	"reservation-management/list-reservation/db"
	"reservation-management/list-reservation/resolvers" // Importar resolvers

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

	// Crear instancia de Gin
	router := gin.Default()

	// Configurar CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Ajusta según sea necesario
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Crear el handler de GraphQL
	graphqlHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	// Definir la ruta para GraphQL
	router.POST("/list-reservation", gin.WrapH(graphqlHandler))

	// Levantar el servidor en el puerto 3012
	fmt.Println("Servidor corriendo en http://localhost:3012")
	log.Fatal(router.Run(":3012"))
}
