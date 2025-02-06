package models

import (
	"availability-management/delete-availability/config"
	"log"
)

// DeleteAvailability elimina una disponibilidad por su ID usando una función
func DeleteAvailability(id int) error {
	// Usamos SELECT para llamar a una función en PostgreSQL
	_, err := config.DB.Exec("SELECT delete_availability_by_id($1)", id)
	if err != nil {
		log.Println("Error al eliminar la disponibilidad:", err)
		return err
	}
	return nil
}
