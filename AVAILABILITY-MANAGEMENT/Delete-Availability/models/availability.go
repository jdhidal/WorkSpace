package models

import (
	"availability-management/delete-availability/config"
	"log"
)

func DeleteAvailability(id int) error {
	_, err := config.DB.Exec("SELECT delete_availability_by_id($1)", id)
	if err != nil {
		log.Println("Error al eliminar la disponibilidad:", err)
		return err
	}
	return nil
}
