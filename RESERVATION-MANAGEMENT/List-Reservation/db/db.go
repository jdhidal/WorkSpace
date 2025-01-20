package db

import (
	"log"
	"reservation-management/list-reservation/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB es la instancia de la base de datos
var DB *gorm.DB

// InitDB inicializa la conexión a la base de datos
func InitDB() {
	var err error
	dsn := "user:password@tcp(mysql-server:3306)/reservation_db?charset=utf8&parseTime=True&loc=Local"
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}
	DB.AutoMigrate(&models.Reservation{})
}

// CloseDB cierra la conexión a la base de datos
func CloseDB() {
	DB.Close()
}
