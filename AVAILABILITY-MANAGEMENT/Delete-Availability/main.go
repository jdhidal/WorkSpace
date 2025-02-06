package main

import (
	"availability-management/delete-availability/config"
	"availability-management/delete-availability/routers"
	"fmt"
	"os"
)

func main() {
	// Conectar a la base de datos
	config.ConnectDB()

	// Configurar las rutas
	r := routers.SetupRouter()

	// Obtener el puerto desde las variables de entorno
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3009" // Usamos el puerto 3009
	}

	// Iniciar el servidor
	fmt.Println("🚀 Servidor corriendo en el puerto", port)
	r.Run(":" + port)
}
