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
	fmt.Println("🚀 Run Service in port use Instance AWS test 4", port)
	r.Run(":" + port)
}
