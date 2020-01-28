package cms

import (
	"log"
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
)

type Controller struct {
	Db *gorm.DB
}

func (cr *Controller) RegisterRoutes(e *echo.Echo) {
	e.POST("/login", cr.login)
	e.POST("/register", cr.register)
	e.GET("/posts/:userId", cr.getBlogPosts)
	e.POST("/posts/:userId", cr.addBlogPost)
	e.PUT("/posts/:id", cr.updateBlogPost)
	e.DELETE("/posts/:id", cr.deleteBlogPost)
}

func (cr *Controller) login(c echo.Context) error {
	loginData := &LoginBody{}

	if err := c.Bind(loginData); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during binding")
	}

	user := &User{}
	db := cr.Db.Where("login = ? AND password = ?", loginData.Login, loginData.Password).First(user)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}
	user.Password = ""

	return c.JSON(http.StatusOK, user)
}

func (cr *Controller) register(c echo.Context) error {
	newUser := &User{}

	if err := c.Bind(newUser); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during binding")
	}

	cr.Db.NewRecord(newUser)
	db := cr.Db.Create(newUser)

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}

	return c.String(http.StatusCreated, "Created new user")
}

func (cr *Controller) getBlogPosts(c echo.Context) error {
	userId := c.Param("userId")

	var blogPosts []*BlogPost
	db := cr.Db.Where("userId = ?", userId).Find(blogPosts)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}
	return c.JSON(http.StatusOK, blogPosts)
}

func (cr *Controller) addBlogPost(c echo.Context) error {
	userId := c.Param("userId")

	blogPost := &BlogPost{}

	if err := c.Bind(blogPost); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during binding")
	}

	if intId, err := strconv.ParseUint(userId, 10, 32); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during uint conv")
	} else {
		blogPost.UserId = uint(intId)
	}

	cr.Db.NewRecord(blogPost)
	db := cr.Db.Create(blogPost)

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}

	return c.String(http.StatusCreated, "Created new blog post")
}

func (cr *Controller) updateBlogPost(c echo.Context) error {
	blogPost := &BlogPost{}

	if err := c.Bind(blogPost); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during binding")
	}

	db := cr.Db.Model(blogPost).Update("Content")

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}

	return c.String(http.StatusCreated, "Updated blog post")
}

func (cr *Controller) deleteBlogPost(c echo.Context) error {
	id := c.Param("id")

	if intId, err := strconv.ParseUint(id, 10, 32); err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured during uint conv")
	} else {
		idHolder := &BlogPost{}
		idHolder.ID = uint(intId)

		db := cr.Db.Delete(idHolder)

		if err := db.Error; err != nil {
			log.Print(err)
			return c.String(http.StatusBadRequest, "error occured on db")
		}

		return c.String(http.StatusCreated, "Deleted blog post")
	}

}
