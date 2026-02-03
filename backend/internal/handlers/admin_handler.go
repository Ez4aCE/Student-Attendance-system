package handlers

import (
	"context"
	"net/http"
	"placecom-attendence/internal/config"
	"placecom-attendence/internal/models"

	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct{
	Username string `json:"username"`
	Password string `json:"password"`
}

func AdminLogin( c * gin.Context){
	var req LoginRequest
	if err:= c.ShouldBindJSON(&req); err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":"Invalid request"})
		return
	}

	ctx, cancel:=context.WithTimeout(context.Background(),5*time.Second)

	defer cancel()

	adminCol := config.DB.Collection("admins")

	var admin models.Admin

	err:=adminCol.FindOne(ctx, bson.M{"username":req.Username}).Decode(&admin)

	if err!=nil{
		c.JSON(http.StatusUnauthorized, gin.H{"error":"invalid credentials"})
		return
	}

	err =bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash),[]byte(req.Password))

	if err!=nil{
		c.JSON(http.StatusUnauthorized, gin.H{"error":"invalid credentials"})
		return
	}

	c.SetCookie("admin",admin.Username,3600*24,"/","", true, true)

	c.JSON(http.StatusOK, gin.H{"message":"Logged in"})

}