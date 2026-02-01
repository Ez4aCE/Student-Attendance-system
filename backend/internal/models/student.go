package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Student struct{
	ID      primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name    string             `bson:"name" json:"name"`
	RollNo  string             `bson:"rollNo" json:"rollNo"`
	Email   string             `bson:"email" json:"email"`
	Phone   string             `bson:"phone" json:"phone"`
	Branch  string             `bson:"branch" json:"branch"`
	Section string             `bson:"section" json:"section"`
}