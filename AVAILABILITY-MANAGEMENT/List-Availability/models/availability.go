package models

import (
	"availability-management/list-availability/config"
	"log"
)

// Availability representa la estructura de la disponibilidad
type Availability struct {
	ID               int    `json:"id"`
	CoworkingSpaceID int    `json:"coworking_space_id"`
	StartDate        string `json:"start_date"`
	EndDate          string `json:"end_date"`
	StartTime        string `json:"start_time"`
	EndTime          string `json:"end_time"`
	Status           string `json:"status"`
	MaxCapacity      int    `json:"max_capacity"`
	Notes            string `json:"notes"`
	CreatedAt        string `json:"created_at"`
}

// GetAvailabilitiesByCoworkingSpaceID llama al procedimiento almacenado para obtener las disponibilidades
func GetAvailabilitiesByCoworkingSpaceID(coworkingSpaceID int) ([]Availability, error) {
	// Preparar consulta para llamar al procedimiento almacenado
	rows, err := config.DB.Query("SELECT * FROM get_availabilities_by_coworking_space_id($1)", coworkingSpaceID)
	if err != nil {
		log.Fatal("Error al obtener las disponibilidades: ", err)
		return nil, err
	}
	defer rows.Close()

	var availabilities []Availability

	// Iterar sobre los resultados y agregar a la lista
	for rows.Next() {
		var availability Availability
		if err := rows.Scan(
			&availability.ID,
			&availability.CoworkingSpaceID,
			&availability.StartDate,
			&availability.EndDate,
			&availability.StartTime,
			&availability.EndTime,
			&availability.Status,
			&availability.MaxCapacity,
			&availability.Notes,
			&availability.CreatedAt,
		); err != nil {
			log.Fatal("Error al escanear los resultados: ", err)
			return nil, err
		}
		availabilities = append(availabilities, availability)
	}

	return availabilities, nil
}
