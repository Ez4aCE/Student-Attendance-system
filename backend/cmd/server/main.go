package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"placecom-attendence/internal/config"
	"placecom-attendence/internal/routes"
)

func main(){
	err:=godotenv.Load()
	
	if err!=nil{
		log.Fatal("error loading .env file")
	}
	config.ConnectMongo()

	r:=gin.Default()
	r.Use(cors.New(cors.Config{
	AllowOrigins:     []string{"http://localhost:3000"},
	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
	AllowHeaders:     []string{"Origin", "Content-Type"},
	AllowCredentials: true,
	MaxAge:           12 * time.Hour,
}))

	routes.SetupRoutes(r)
	r.GET("/", func(c *gin.Context){
		c.JSON(200, gin.H{"message":"server is running"})
	})
	

	port:= os.Getenv("PORT")
	if port==""{
		port="8080"
	}
	r.Run(":"+port)
}