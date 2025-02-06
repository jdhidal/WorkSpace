package main

import (
	"availability-management/list-availability/config"
	"availability-management/list-availability/routers"
	"fmt"
	"os"
)

func main() {
	config.ConnectDB()
	r := routers.SetupRouter()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3008"
	}
	fmt.Println("🚀 Servidor corriendo en el puerto", port)
	r.Run(":" + port)
}
