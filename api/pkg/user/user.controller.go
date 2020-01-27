package user

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Controller struct{}

func (cr *Controller) RegisterRoutes(e *echo.Echo) {
	e.GET("/login", cr.login)
}

type LoginBody struct {
	Login    string
	Password string
}

func (cr *Controller) login(c echo.Context) error {
	return c.String(http.StatusOK, "Hello World!")
}
