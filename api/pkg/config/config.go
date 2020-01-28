package config

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	validation "github.com/go-ozzo/ozzo-validation"
)

type Config struct {
	DB  DB  `json:"db"`
	API API `json:"api"`
}

func (c *Config) Validate() error {
	return validation.ValidateStruct(
		c,
		validation.Field(&c.DB),
		validation.Field(&c.API),
	)
}

type DB struct {
	User     string `json:"user"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Name     string `json:"name"`
	Debug    bool   `json:"debug"`
}

func (db DB) Validate() error {
	return validation.ValidateStruct(
		&db,
		validation.Field(&db.User, validation.Required),
		validation.Field(&db.Password, validation.Required),
		validation.Field(&db.Host, validation.Required),
		validation.Field(&db.Port, validation.Required),
		validation.Field(&db.Name, validation.Required),
		validation.Field(&db.Debug, validation.Required),
	)
}

type API struct {
	Port   int    `json:"port"`
	Debug  bool   `json:"debug"`
	WebUrl string `json:"webUrl"`
}

func (api API) Validate() error {
	return validation.ValidateStruct(
		&api,
		validation.Field(&api.Port, validation.Required),
		validation.Field(&api.Debug, validation.Required),
	)
}

func Get() (*Config, error) {
	var cfg Config
	flag.StringVar(&cfg.DB.User, "dbUser", "", "Database user")
	flag.StringVar(&cfg.DB.Password, "dbPassword", "", "Database password")
	flag.StringVar(&cfg.DB.Host, "dbHost", "localhost", "Database host")
	flag.IntVar(&cfg.DB.Port, "dbPort", 5432, "Databse port")
	flag.StringVar(&cfg.DB.Name, "dbName", "", "Database name")
	flag.BoolVar(&cfg.DB.Debug, "dbDebug", true, "Database debug")
	flag.IntVar(&cfg.API.Port, "apiPort", 1323, "API port")
	flag.BoolVar(&cfg.API.Debug, "apiDebug", true, "API debug")
	flag.StringVar(&cfg.API.WebUrl, "webUrl", "", "Web address for API CORS")

	configPath := flag.String("config", "", "Path to config")

	log.Println("Parsing flags...")
	flag.Parse()

	if *configPath != "" {
		log.Println("Loading config from file...")
		absConfigPath, _ := filepath.Abs(*configPath)
		cfgFile, err := os.Open(absConfigPath)
		if err != nil {
			return nil, fmt.Errorf("Could not open config %v", err)
		}
		defer cfgFile.Close()

		jsonParser := json.NewDecoder(cfgFile)
		if err := jsonParser.Decode(&cfg); err != nil {
			return nil, fmt.Errorf("Could not parse config %v", err)
		}
	}

	if err := cfg.Validate(); err != nil {
		return nil, fmt.Errorf("Could not validate config %v", err)
	}

	return &cfg, nil
}
