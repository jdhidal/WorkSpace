package db

import (
	"log"
	"os"
	"reservation_management/create_reservation/models" // Asegúrate de importar el paquete models

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func InitDB() {
	// Cargar variables de entorno desde el archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error al cargar el archivo .env: %v", err)
	}

	// Obtener valores de las variables de entorno
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	// Construir el DSN
	dsn := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + name + "?charset=utf8&parseTime=True&loc=Local"

	// Conectar a la base de datos
	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}

	// Migrar la estructura Reservation
	DB.AutoMigrate(&models.Reservation{})
}

func CloseDB() {
	DB.Close()
}
