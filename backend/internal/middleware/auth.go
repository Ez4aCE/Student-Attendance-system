package middleware

import (
	
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminAuth() gin.HandlerFunc{
	return func(c *gin.Context){
		_, err := c.Cookie("admin")
		if err!=nil{
			c.JSON(http.StatusUnauthorized, gin.H{"error":"Admin only"})
			c.Abort()
			return
		}
		c.Next()
	}
}