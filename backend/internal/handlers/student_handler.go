package handlers

import (
	"context"
	"net/http"
	"placecom-attendence/internal/config"
	"placecom-attendence/internal/models"
	
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddStudent(c *gin.Context){
	var student models.Student

	if err:=  c.ShouldBindJSON(&student); err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	ctx, cancel:=context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection:= config.DB.Collection("students")

	_,err := collection.InsertOne(ctx, student)

	if err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student with this roll number already exists"})
	return
	}

	c.JSON(http.StatusOK, gin.H{"message":"student added"})
}

func GetStudents(c* gin.Context){
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	studentsCol:= config.DB.Collection("students")
	attendanceCol:=config.DB.Collection("attendance")

	cursor, err:= studentsCol.Find(ctx, bson.M{})

	if err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to fetch students details"})
		return
	}
	defer cursor.Close(ctx)

	type StudentResponse struct {
	Name            string `json:"name"`
	RollNo          string `json:"rollNo"`
	Branch          string `json:"branch"`
	Section         string `json:"section"`
	Team            string `json:"team"`
	VolunteerDay    string `json:"volunteerDay"`
	AttendanceCount int64  `json:"attendance"`
}


	var response []StudentResponse

	for cursor.Next(ctx){
		var student models.Student
		cursor.Decode(&student)

		count,_:=attendanceCol.CountDocuments(ctx,bson.M{
			"studentId":student.ID,
		})

		response=append(response, StudentResponse{
			Name: student.Name,
			RollNo: student.RollNo,
			Branch: student.Branch,
			Section: student.Section,
			AttendanceCount: count,
			Team:         student.Team,
			VolunteerDay: student.VolunteerDay,

		})
	}
	c.JSON(http.StatusOK, response)
}

func GetStudentHistory(c *gin.Context){
	rollNo:=c.Param("rollNo")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	studentsCol:=config.DB.Collection("students")
	attendanceCol:=config.DB.Collection("attendance")

	var student models.Student
	err:= studentsCol.FindOne(ctx, bson.M{"rollNo":rollNo}).Decode(&student)

	if err!=nil{
		c.JSON(http.StatusNotFound, gin.H{"error":"Student not found"})
		return
	}

	cursor, err:=attendanceCol.Find(ctx,bson.M{"studentId":student.ID})

	if err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Failed to fetch attandance "})
		return
	}

	defer cursor.Close(ctx)

	dates := []string{}

	for cursor.Next(ctx){
		var record models.Attendance
		cursor.Decode(&record)
		dates=append(dates, record.Date)
	}

	c.JSON(http.StatusOK, gin.H{
		"name":            student.Name,
		"rollNo":          student.RollNo,
		"branch":          student.Branch,
		"section":         student.Section,
		"team":            student.Team,
		"volunteerDay":    student.VolunteerDay,
		"attendanceDates": dates,
	})

}


func UpdateStudent(c *gin.Context){
	var updated models.Student
	rollNo:= c.Param("rollNo")

	if err:= c.ShouldBindJSON(&updated); err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel:= context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col:= config.DB.Collection("students")

	update := bson.M{
		"$set": bson.M{
			"name": updated.Name,
			"email": updated.Email,
			"phone":updated.Phone,
			"branch":updated.Branch,
			"section": updated.Section,
			"team":updated.Team,
			"volunteerDay":updated.VolunteerDay,
		},
	}

	_, err:=col.UpdateOne(ctx, bson.M{"rollNo":rollNo},update)

	if err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message":"Student Updated"})

}
