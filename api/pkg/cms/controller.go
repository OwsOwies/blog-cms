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
	e.GET("/posts/:id", cr.getBlogPosts)
	e.POST("/posts/:id", cr.addBlogPost)
	e.PUT("/posts/:id", cr.updateBlogPost)
	e.DELETE("/posts/:id", cr.deleteBlogPost)
	e.GET("/users/:id", cr.getBiography)
	e.PUT("/users/:id", cr.updateBiography)
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
		return c.JSON(http.StatusBadRequest, "error occured during binding")
	}

	cr.Db.NewRecord(newUser)
	db := cr.Db.Create(newUser)

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured on db")
	}

	return c.JSON(http.StatusCreated, "Created new user")
}

func (cr *Controller) getBlogPosts(c echo.Context) error {
	visibleName := c.Param("id")
	log.Print(visibleName, "for blog posts")

	user := &User{}
	db := cr.Db.Where("visible_name = ?", visibleName).First(user)

	var blogPosts []BlogPost
	db = cr.Db.Where("user_id = ?", user.ID).Find(&blogPosts)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured on db")
	}
	return c.JSON(http.StatusOK, blogPosts)
}

func (cr *Controller) addBlogPost(c echo.Context) error {
	userId := c.Param("id")
	log.Print(userId, "for adding new post")

	blogPost := &BlogPost{}

	if err := c.Bind(blogPost); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during binding")
	}

	if intId, err := strconv.ParseUint(userId, 10, 32); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during uint conv")
	} else {
		blogPost.UserId = uint(intId)
	}

	cr.Db.NewRecord(blogPost)
	db := cr.Db.Create(blogPost)

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured on db")
	}

	return c.JSON(http.StatusCreated, "Created new blog post")
}

func (cr *Controller) updateBlogPost(c echo.Context) error {
	blogPost := &BlogPost{}

	if err := c.Bind(blogPost); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during binding")
	}

	db := cr.Db.Model(blogPost).Where("ID = ?", blogPost.ID).Update("content", blogPost.Content)

	log.Print(db.Error)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured on db")
	}

	return c.JSON(http.StatusCreated, "Updated blog post")
}

func (cr *Controller) deleteBlogPost(c echo.Context) error {
	id := c.Param("id")

	if intId, err := strconv.ParseUint(id, 10, 32); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during uint conv")
	} else {
		idHolder := &BlogPost{}
		idHolder.ID = uint(intId)

		db := cr.Db.Delete(idHolder)

		if err := db.Error; err != nil {
			log.Print(err)
			return c.JSON(http.StatusBadRequest, "error occured on db")
		}

		return c.JSON(http.StatusCreated, "Deleted blog post")
	}

}

func (cr *Controller) updateBiography(c echo.Context) error {
	bio := &Biography{}

	if err := c.Bind(bio); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during binding")
	}

	userId := c.Param("id")
	if intId, err := strconv.ParseUint(userId, 10, 32); err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, "error occured during uint conv")
	} else {
		user := &User{}
		db := cr.Db.Model(user).Where("ID = ?", uint(intId)).Update("bio", bio.Bio).Update("contact", bio.Contact).Update("visibleName", bio.VisibleName)

		log.Print(db.Error)
		if err := db.Error; err != nil {
			log.Print(err)
			return c.JSON(http.StatusBadRequest, "error occured on db")
		}

		return c.JSON(http.StatusCreated, "Updated blog post")
	}
}

func (cr *Controller) getBiography(c echo.Context) error {
	visibleName := c.Param("id")

	user := &User{}
	db := cr.Db.Where("visible_name = ?", visibleName).First(user)
	if err := db.Error; err != nil {
		log.Print(err)
		return c.String(http.StatusBadRequest, "error occured on db")
	}

	bio := &Biography{Contact: user.Contact, Bio: user.Bio, VisibleName: user.VisibleName}

	return c.JSON(http.StatusOK, bio)
}
