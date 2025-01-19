package db

import (
	"log"
	"reservation_management/create_reservation/models" // Asegúrate de importar el paquete models

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dsn := "user:password@tcp(mysql-server:3306)/reservation_db?charset=utf8&parseTime=True&loc=Local"
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}
	DB.AutoMigrate(&models.Reservation{}) // Ahora migramos la estructura Reservation desde el paquete models
}

func CloseDB() {
	DB.Close()
}
