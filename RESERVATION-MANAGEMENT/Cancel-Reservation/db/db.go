package db

import (
	"log"
	"os"
	"reservation_management/cancel-reservation/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

// DB es la instancia de la base de datos
var DB *gorm.DB

// InitDB inicializa la conexión a la base de datos
func InitDB() {
	// Cargar las variables del archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error al cargar el archivo .env: %v", err)
	}

	// Obtener las variables del .env
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Construir el DSN (Data Source Name)
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8&parseTime=True&loc=Local"

	// Conectar a la base de datos
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
