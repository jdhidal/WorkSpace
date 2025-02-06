package models

import (
	"availability-management/create-availability/config"
	"log"
)

// Availability representa la estructura de la tabla en PostgreSQL
type Availability struct {
	ID               int    `json:"id"`
	CoworkingSpaceID int    `json:"coworking_space_id"`
	StartDate        string `json:"start_date"`
	EndDate          string `json:"end_date"`
	StartTime        string `json:"start_time"`
	EndTime          string `json:"end_time"`
	Status           string `json:"status"`
	MaxCapacity      int    `json:"max_capacity"`
	Notes            string `json:"notes,omitempty"`
}

// CheckSpaceExists verifica si un espacio de coworking ya tiene disponibilidad
func CheckSpaceExists(coworkingSpaceID int) bool {
	var exists bool
	err := config.DB.QueryRow("SELECT check_space_exists($1)", coworkingSpaceID).Scan(&exists)
	if err != nil {
		log.Println("Error verificando existencia del espacio:", err)
		return false
	}
	return exists
}

// CreateAvailability ejecuta el procedimiento almacenado para insertar disponibilidad
func CreateAvailability(av Availability) error {
	_, err := config.DB.Exec("CALL create_availability($1, $2, $3, $4, $5, $6, $7, $8)",
		av.CoworkingSpaceID, av.StartDate, av.EndDate, av.StartTime, av.EndTime, av.Status, av.MaxCapacity, av.Notes)
	return err
}
