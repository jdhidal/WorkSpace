package main

import (
	"availability-management/create-availability/config"
	"availability-management/create-availability/routers"
	"fmt"
	"os"
)

func main() {
	// Asegúrate de que las variables de entorno estén cargadas
	fmt.Println("DB_HOST:", os.Getenv("DB_HOST"))
	fmt.Println("DB_PORT:", os.Getenv("DB_PORT"))
	fmt.Println("DB_USER:", os.Getenv("DB_USER"))
	fmt.Println("DB_PASSWORD:", os.Getenv("DB_PASSWORD"))
	fmt.Println("DB_NAME:", os.Getenv("DB_NAME"))

	config.ConnectDB()
	r := routers.SetupRouter()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3007"
	}
	fmt.Println("🚀 Run Service in port use Instance AWS test 8", port)
	r.Run(":" + port)
}
