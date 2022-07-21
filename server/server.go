// package main

// import (
// 	"context"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"log"
// 	"os"
// 	"done-assessment/db"
// 	"done-assessment/web"
// )

// func main() {
// 	client, err := mongo.Connect(context.TODO(), clientOptions())
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer client.Disconnect(context.TODO())
// 	mongoDB := db.NewMongo(client)
// 	// CORS is enabled only in prod profile
// 	cors := os.Getenv("profile") == "prod"
// 	app := web.NewApp(mongoDB, cors)
// 	err = app.Serve()
// 	log.Println("Error", err)
// }

// func clientOptions() *options.ClientOptions {
// 	host := "db"
// 	if os.Getenv("profile") != "prod" {
// 		host = "localhost"
// 	}
// 	return options.Client().ApplyURI(
// 		"mongodb://" + host + ":27017",
// 	)
// }

package main

import (
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

// 'patient' represents data about a patient.
type patient struct {
    ID string `json:"id"`
    Name string `json:"name"`
    DateOfBirth string `json:"dateOfBirth"`
    PhoneNumber string `json:"phoneNumber"`
    Email string `json:"email"`
    Address string `json:"address"`
    Photo string `json:"photo"`
    AppointmentTime string `json:"appointmentTime"`
}

// patients slice to seed record patient data.
var patients = []patient{
    {
        ID: "1", 
        Name: "Jane Public", 
        DateOfBirth: "11/14/1987", 
        PhoneNumber: "(555) 555-5555", 
        Email: "jane.public@gmail.com",
        Address: "1234 Main St, Springfield, IL 62723",
        Photo: "https://i.insider.com/5e1f79f3b787a606761b4617?width=600&format=jpeg&auto=webp",
        AppointmentTime: "08/31/2022",
    },
    {
        ID: "2", 
        Name: "Janice Ann Sample", 
        DateOfBirth: "08/04/1975", 
        PhoneNumber: "(555) 555-5555", 
        Email: "janice.sample@gmail.com",
        Address: "123 Main St, Apt. 1, Harrisburg, PA 17101",
        Photo: "https://whyy.org/wp-content/uploads/2020/05/realid-1-768x432.jpg",
        AppointmentTime: "09/06/2022",
    },
}

func main() {
    router := gin.Default()
    // CORS for https://foo.com and https://github.com origins, allowing:
    // - PUT and PATCH methods
    // - Origin header
    // - Credentials share
    // - Preflight requests cached for 12 hours
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
        ExposeHeaders:    []string{"Content-Length", "*"},
        AllowCredentials: true,
        AllowOriginFunc: func(origin string) bool {
            return origin == "*"
        },
    }))

    router.GET("/upload")
    router.GET("/patients", getPatients)
    router.GET("/patients/:id", getPatientByID)
    router.POST("/patients", postPatients)
    router.Run("localhost:8080")
}

/* Get patients */
func getPatients(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, patients)
}

/* Post new patient */
func postPatients(c *gin.Context) {
    var newPatient patient

    if err := c.BindJSON(&newPatient); err != nil {
        return
    }

    patients = append(patients, newPatient)
    c.IndentedJSON(http.StatusCreated, newPatient)
}

/* Find patient by id */
func getPatientByID(c *gin.Context) {
    id := c.Param("id")
    for _, a := range patients {
        if a.ID == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "patient not found"})
}