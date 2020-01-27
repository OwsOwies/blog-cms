package api

import (
	"blog-api/pkg/user"
	"log"

	"github.com/labstack/echo/v4"
)

func StartAPI() {
	log.Println("Initializing server...")

	e := echo.New()

	RegisterRoutes(e)

	log.Println("Starting server...")

	e.Logger.Fatal(e.Start(":1343"))
}

func RegisterRoutes(e *echo.Echo) {
	uc := user.Controller{}
	uc.RegisterRoutes(e)
}
