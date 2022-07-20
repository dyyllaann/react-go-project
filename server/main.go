package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
    cors "github.com/rs/cors/wrapper/gin"
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
    router.Use(cors.Default())

    router.GET("/upload")
    router.GET("/patients", getPatients)
    router.GET("/patients/:id", getPatientByID)
    router.POST("/patients", postPatients)
    router.Run("localhost:8080")
}

// getPatients responds with the list of all patients as JSON.
func getPatients(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, patients)
}

// postPatients adds an patient from JSON received in the request body.
func postPatients(c *gin.Context) {
    var newPatient patient

    // Call BindJSON to bind the received JSON to
    // newPatient.
    if err := c.BindJSON(&newPatient); err != nil {
        return
    }

    // Add the new patient to the slice.
    patients = append(patients, newPatient)
    c.IndentedJSON(http.StatusCreated, newPatient)
}

// getPatientByID locates the patient whose ID value matches the id
// parameter sent by the client, then returns that patient as a response.
func getPatientByID(c *gin.Context) {
    id := c.Param("id")

    // Loop through the list of patients, looking for
    // an patient whose ID value matches the parameter.
    for _, a := range patients {
        if a.ID == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "patient not found"})
}