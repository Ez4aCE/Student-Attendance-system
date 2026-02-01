package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Attendance struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Date      string             `bson:"date" json:"date"` // "2026-02-01"
	StudentID primitive.ObjectID `bson:"studentId" json:"studentId"`
}
