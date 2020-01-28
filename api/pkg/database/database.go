package database

import (
	"fmt"
	"log"
	"time"

	"blog-api/pkg/config"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func CreateConnection(cfg config.DB) (*gorm.DB, error) {
	log.Println("Creating database connection...")

	connectionString := buildConnectionString(cfg)

	var exponent uint8
	for {
		db, err := gorm.Open("postgres", connectionString)
		if err == nil {
			db.LogMode(cfg.Debug)
			db.SingularTable(true)
			return db, nil
		}

		log.Println("Failed to open database connection:", err)
		time.Sleep((1 << exponent) * time.Second) // 1 << exponent == 2^exponent

		if exponent < 5 {
			exponent++
		}
	}
}

func buildConnectionString(cfg config.DB) string {
	return fmt.Sprintf(
		"postgresql://%v:%v@%v:%v/%v?sslmode=disable",
		cfg.User,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.Name,
	)
}
