package config

import (
	"context"
	"log"

	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectMongo(){
	uri :=os.Getenv("MONGO_URL")

	ctx, cancel :=context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err:=mongo.Connect(ctx, options.Client().ApplyURI(uri))

	if err!=nil{
		log.Fatal("mongo connection failed",err)
	}
	DB = client.Database(os.Getenv("DB_NAME"))
	studentsCol:=DB.Collection("students")

	indexModel:=mongo.IndexModel{
		Keys: bson.M{"rollNo":1},
		Options: options.Index().SetUnique(true),
	}
	_,err = studentsCol.Indexes().CreateOne(context.Background(), indexModel)

	if err!=nil{
		log.Fatal("failed to create student index",err)
	}

	attendanceCol := DB.Collection("attendance")

	attendanceIndex:= mongo.IndexModel{
		Keys: bson.D{
            {Key: "date", Value: 1},      
            {Key: "studentId", Value: 1},
        },
		Options: options.Index().SetUnique(true),
	}

	_, err=attendanceCol.Indexes().CreateOne(context.Background(),attendanceIndex)
	if err!=nil{
		log.Fatal("failed to create attendance index",err)
	}
	log.Println("connected to mongo db")

}