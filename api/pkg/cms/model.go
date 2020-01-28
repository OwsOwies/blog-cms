package cms

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Bio         string `json:"count"`
	Contact     string `json:"contact"`
	Password    string
	IsAdmin     bool   `json:"isAdmin"`
	VisibleName string `gorm:"unique;not null" json:"visibleName"`
	Login       string `gorm:"unique;not null" json:"login"`
}

type LoginBody struct {
	Login    string
	Password string
}

type BlogPost struct {
	gorm.Model
	UserId  uint   `json:"userId,omitempty"`
	Date    string `json:"date"`
	Content string `json:"content"`
}
