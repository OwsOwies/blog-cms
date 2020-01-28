package main

import (
	"blog-api/pkg/api"
	"blog-api/pkg/cms"
	"blog-api/pkg/config"
	"blog-api/pkg/database"
)

func main() {
	cfg, err := config.Get()
	if err != nil {
		panic(err)
	}

	db, err := database.CreateConnection(cfg.DB)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.AutoMigrate(&cms.User{}, &cms.BlogPost{})

	api.StartAPI(db)
}
