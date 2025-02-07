package main

import (
	"availability-management/delete-availability/config"
	"availability-management/delete-availability/routers"
	"fmt"
	"os"
)

func main() {
	config.ConnectDB()

	r := routers.SetupRouter()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3009"
	}

	fmt.Println("🚀 Servidor corriendo en el puerto", port)
	r.Run(":" + port)
}
