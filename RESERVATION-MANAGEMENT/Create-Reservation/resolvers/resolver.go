package resolvers

import (
	"fmt"
	"reservation_management/create_reservation/db"
	"reservation_management/create_reservation/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
)

// Definir el resolver para crear una reserva
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
		// Extraer los argumentos de la mutación
		facilityName, _ := params.Args["facility_name"].(string)
		userName, _ := params.Args["user_name"].(string)
		reservationDate, _ := params.Args["reservation_date"].(string)
		status, _ := params.Args["status"].(string)

		// Validar que no haya campos vacíos
		if facilityName == "" || userName == "" || reservationDate == "" || status == "" {
			return map[string]interface{}{
				"success": false,
				"message": "Todos los campos son requeridos",
			}, nil
		}

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

		// Retornar éxito
		return map[string]interface{}{
			"success": true,
			"message": "Reserva creada exitosamente",
		}, nil
	},
}

// Crear el objeto Mutation para envolver la mutación
var Mutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "Mutation",
	Fields: graphql.Fields{
		"createReservation": CreateReservationMutation,
	},
})

// Crear el esquema de GraphQL con la mutación
var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    nil,      // Si tienes consultas, se agregan aquí
	Mutation: Mutation, // Pasamos el objeto Mutation en lugar del Field directamente
})

// Configuración del servidor Gin con CORS
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Configuración de CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Ruta para GraphQL
	router.POST("/create-reservation", graphqlHandler)

	return router
}

// Función que maneja la solicitud GraphQL manualmente
func graphqlHandler(c *gin.Context) {
	var req struct {
		Query     string                 `json:"query"`
		Variables map[string]interface{} `json:"variables"`
	}

	// Leer la solicitud JSON
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Error al parsear la solicitud"})
		return
	}

	// Ejecutar la consulta o mutación
	params := graphql.Params{
		Schema:         Schema,
		RequestString:  req.Query,
		VariableValues: req.Variables,
	}

	result := graphql.Do(params)
	if len(result.Errors) > 0 {
		c.JSON(500, gin.H{"error": fmt.Sprintf("Error en la ejecución de GraphQL: %v", result.Errors)})
		return
	}

	// Responder con el resultado de la consulta
	c.JSON(200, result)
}
