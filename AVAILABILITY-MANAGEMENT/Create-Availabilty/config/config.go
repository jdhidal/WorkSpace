package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	DB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error Conect in DataBase:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("It can do ping in DataBases:", err)
	}

	fmt.Println("Conect to PostgreSQL")
}
