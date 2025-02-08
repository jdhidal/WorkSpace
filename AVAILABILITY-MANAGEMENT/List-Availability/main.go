package main

import (
	"availability-management/list-availability/config"
	"availability-management/list-availability/routers"
	"fmt"
	"os"
)

func main() {

	fmt.Println("DB_HOST:", os.Getenv("DB_HOST"))
	fmt.Println("DB_PORT:", os.Getenv("DB_PORT"))
	fmt.Println("DB_USER:", os.Getenv("DB_USER"))
	fmt.Println("DB_PASSWORD:", os.Getenv("DB_PASSWORD"))
	fmt.Println("DB_NAME:", os.Getenv("DB_NAME"))

	config.ConnectDB()
	r := routers.SetupRouter()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3008"
	}
	fmt.Println("🚀 Servidor corriendo en el puerto", port)
	r.Run(":" + port)
}
