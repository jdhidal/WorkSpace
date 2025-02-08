package db

import (
	"log"
	"os"
	"reservation-management/list-reservation/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
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

	// Obtener las variables de entorno
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Validar que las variables necesarias estén presentes
	if dbUser == "" || dbPassword == "" || dbHost == "" || dbPort == "" || dbName == "" {
		log.Fatal("Faltan variables de entorno necesarias para la conexión a la base de datos.")
	}

	// Crear la cadena de conexión DSN
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8&parseTime=True&loc=Local"

	// Conectar a la base de datos
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}

	// Automigrar el modelo de la reserva
	DB.AutoMigrate(&models.Reservation{})
}

// CloseDB cierra la conexión a la base de datos
func CloseDB() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Error al obtener el objeto DB: %v", err)
	}
	if err := sqlDB.Close(); err != nil {
		log.Fatalf("Error al cerrar la conexión a la base de datos: %v", err)
	}
}
