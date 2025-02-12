package resolvers

import (
	"fmt"
	"reservation_management/create_reservation/db"
	"reservation_management/create_reservation/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
)

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

		if facilityName == "" || userName == "" || reservationDate == "" || status == "" {
			return map[string]interface{}{
				"success": false,
				"message": "Todos los campos son requeridos",
			}, nil
		}

		reservation := models.Reservation{
			FacilityName:    facilityName,
			UserName:        userName,
			ReservationDate: reservationDate,
			Status:          status,
		}

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

var Mutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "Mutation",
	Fields: graphql.Fields{
		"createReservation": CreateReservationMutation,
	},
})

var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    nil,      // Si tienes consultas, se agregan aquí
	Mutation: Mutation, // Pasamos el objeto Mutation en lugar del Field directamente
})

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/create-reservation", graphqlHandler)

	return router
}

func graphqlHandler(c *gin.Context) {
	var req struct {
		Query     string                 `json:"query"`
		Variables map[string]interface{} `json:"variables"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Error al parsear la solicitud"})
		return
	}

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

	c.JSON(200, result)
}
