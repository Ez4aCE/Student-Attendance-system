package routes

import (
	"placecom-attendence/internal/handlers"
	"placecom-attendence/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	
	r.GET("/students/:rollNo",handlers.GetStudentHistory)
	r.GET("/students", handlers.GetStudents)
	
	r.POST("/admin/login",handlers.AdminLogin)

	admin:=r.Group("/")
	admin.Use(middleware.AdminAuth())
	{
		admin.POST("/students",handlers.AddStudent)
		admin.POST("/attendance",handlers.MarkAttendance)
		admin.PUT("/students/:rollNo", handlers.UpdateStudent)
	}
}
