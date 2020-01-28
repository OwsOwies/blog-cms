package api

import (
	"blog-api/pkg/cms"
	"log"
	"net/http"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func StartAPI(db *gorm.DB) {
	log.Println("Initializing server...")

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodPatch, http.MethodDelete},
	}))

	RegisterRoutes(e, db)

	log.Println("Starting server...")

	e.Logger.Fatal(e.Start(":1343"))
}

func RegisterRoutes(e *echo.Echo, db *gorm.DB) {
	c := cms.Controller{Db: db}
	c.RegisterRoutes(e)
}
