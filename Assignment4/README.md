# SWE 642: Student Survey Application

- Assignment 4

- Hamaad Zuberi
- G01413525

## Overview
This full-stack application implements a student survey system for prospective university students to provide feedback about their campus visits. The application features a Vue.js frontend and a Spring Boot backend with REST API integration and database persistence.

## Project Requirements
The application fulfills the following requirements:
- Prospective students can fill out a survey form about their campus visit
- Users can view all surveys recorded to date
- Users can update and delete existing surveys
- Data is persisted in a MySQL database using JPA/Hibernate
- Full CRUD operations are implemented

## Features
- Welcome homepage with navigation links
- Student Survey form with validation
- List of all surveys with search and filter options
- Edit and delete functionality for individual surveys
- RESTful API integration between frontend and backend
- Data persistence using JPA/Hibernate

### Frontend Setup
1. Clone the repository
2. Navigate to the frontend directory: `cd student-survey-frontend`
4. Start the development server: `npm run serve -- --port 4200`
5. Access the application at: `http://localhost:4200`

### Backend Setup
1. Navigate to the backend directory: `cd student-survey-backend`
2. Update the database configuration in `application.properties` with your MySQL credentials
3. Build the application: `mvn clean install`
4. Run the application: `mvn spring-boot:run`
5. The backend API will be available at: `http://localhost:8080/api/surveys`

### Database Setup
1. Create a new MySQL database: `student_surveys`
2. The application will automatically create the necessary tables on startup

## API Endpoints

| Method | URL                      | Description                |
|--------|--------------------------|----------------------------|
| GET    | /api/surveys             | Get all surveys            |
| GET    | /api/surveys/{id}        | Get survey by ID           |
| POST   | /api/surveys             | Create a new survey        |
| PUT    | /api/surveys/{id}        | Update an existing survey  |
| DELETE | /api/surveys/{id}        | Delete a survey            |

## Survey Form Fields
- First name, last name, street address, city, state, zip, telephone number, email, and date of survey (required fields)
- Campus likes: students, location, campus, atmosphere, dorm rooms, sports (checkboxes)
- Interest source: friends, television, Internet, other (radio buttons)
- Recommendation likelihood: Very Likely, Likely, Unlikely (dropdown)
- Additional comments (text area)
