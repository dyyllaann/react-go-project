# Technical Assessment
### Dylan Arveson for Done. ADHD

## Overview

Even though I recently created a very similar CRUD application using Express/Node as the backend, I decided to challenge myself by learning enough Go
to complete the project. Most visual elements were created using Google's Material UI with additional custom styling. The form and site are fully-functional,
though there is room for improvement, particularly in styling (responsive, additional UI feedback) and site structure. 

## Installing and Running

#### The React client contains the following dependencies:    

@cloudinary/react: ^1.4.1    
@cloudinary/url-gen: ^1.8.0
@emotion/react: ^11.9.3    
@emotion/styled: ^11.9.3    
@mui/icons-material: ^5.8.4    
@mui/material: ^5.9.1    
@mui/x-data-grid: ^5.13.1    
@mui/x-date-pickers: ^5.0.0-beta.1    
axios: ^0.27.2    
date-fns: ^2.28.0    
react: ^18.2.0    
react-dom: ^18.2.0    
react-router-dom: ^6.3.0    
react-scripts: ^5.0.1    
swr: ^1.3.0    

#### The Go server relies on the following dependencies:
  "github.com/gin-gonic/gin"
  cors "github.com/rs/cors/wrapper/gin"

#### To install:
Using the command line, from the `server` folder, install via `go get "github.com/gin-gonic/gin" cors "github.com/rs/cors/wrapper/gin"`
Using the command line, from the `client` folder, install via `npm i @cloudinary/react @cloudinary/url-gen @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid @mui/x-date-pickers axios date-fns react react-dom react-router-dom react-scripts swr`  

#### To run the server:
Using the command line, from the `server` folder, run via `go run *.go`.
Using the command line, from the `client` folder, run via `npm start`

### The Form
The form was styled using Google's Material UI. This promises a clean UI that will look good on any platform and establishes a uniform style. 

<img src="https://res.cloudinary.com/dctj8c2ow/image/upload/v1658282659/Screen_Shot_2022-07-19_at_6.56.38_PM_frnsdr.png"/>

### Image Uploading
For image uploading, I chose Cloudinary API. On receipt of successfull post, `public_id` receives a state change, which allows the URL of the file
to be posted to the Go server. The admin can then view the photo from the admin dashboard. 

<img src="https://res.cloudinary.com/dctj8c2ow/image/upload/v1658282660/Screen_Shot_2022-07-19_at_6.57.20_PM_mfh8av.png"/>

### Visual Confirmation
Cloudinary also provides a visual cue to the user, confirming that the file was uploaded. 

<img src="https://res.cloudinary.com/dctj8c2ow/image/upload/v1658282661/Screen_Shot_2022-07-19_at_6.58.42_PM_qwzgqj.png"/>

### Form Submission Confirmation
Submitting the form sends the user to a confirmation page via a client-side virtual route. 

<img src="https://res.cloudinary.com/dctj8c2ow/image/upload/v1658282618/Screen_Shot_2022-07-19_at_6.59.00_PM_eud06r.png"/>

### Admin Control Panel
The control panel was styled using Google's Material UI and allows sorting by any of the included parameters. 

<img src="https://res.cloudinary.com/dctj8c2ow/image/upload/v1658282618/Screen_Shot_2022-07-19_at_7.00.04_PM_cdgduf.png"/>
