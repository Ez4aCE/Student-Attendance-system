package handlers

import (
	"context"
	"net/http"
	"placecom-attendence/internal/config"
	"placecom-attendence/internal/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

type AttendanceRequest struct{
	Date string `json:"date"`
	RollNos []string `json:"rollNos"`
}


func MarkAttendance(c *gin.Context){
	var req AttendanceRequest
	
	if err:=c.ShouldBindJSON(&req); err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	studentsCol:=config.DB.Collection("students")
	attendanceCol:= config.DB.Collection("attendance")

	for _,roll:= range req.RollNos{
		var student models.Student

		err:= studentsCol.FindOne(ctx,bson.M{"rollNo":roll}).Decode(&student)
		if err!=nil{
			continue
		}
		record:=models.Attendance{
			Date: req.Date,
			StudentID: student.ID,
		}
		_, err = attendanceCol.InsertOne(ctx, record)
		if err != nil {
			continue 
		}
	}

	c.JSON(http.StatusOK, gin.H{"message":"attendance marked"})
}