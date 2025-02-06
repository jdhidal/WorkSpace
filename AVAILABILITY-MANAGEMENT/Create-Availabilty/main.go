package main

import (
	"availability-management/create-availability/config"
	"availability-management/create-availability/routers"
	"fmt"
	"os"
)

func main() {
	config.ConnectDB()
	r := routers.SetupRouter()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3007"
	}
	fmt.Println("🚀 Servidor corriendo en el puerto", port)
	r.Run(":" + port)
}
