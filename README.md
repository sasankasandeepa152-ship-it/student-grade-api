# Student Grade Calculator API

## Project Description

This project is a Node.js REST API that calculates student grades based on marks. It uses Express.js and includes unit tests using Jest.

The project also includes a Jenkins CI/CD pipeline to demonstrate automated code quality checks, testing, building, artifact archiving, and branch-based deployment stages.

## Technologies Used

- Node.js
- Express.js
- Jest
- ESLint
- Git and GitHub
- Jenkins

## Grade Calculation Rules

| Marks | Grade |
|---|---|
| 75 and above | A |
| 65–74 | B |
| 55–64 | C |
| 40–54 | S |
| Below 40 | F |

## Installation

Install the project dependencies:

```bash
npm install
```

## Run the Application

```bash
npm start
```

The API runs on port 3000.

## API Endpoints

### Health Check

**Method:** GET

**Endpoint:** `/health`

Returns the application status and version.

### Calculate Student Grade

**Method:** POST

**Endpoint:** `/grade`

Example request body:

```json
{
  "studentName": "Kamal",
  "marks": 85
}
```

The response includes the student name, marks, calculated grade, and timestamp.

## Testing and Quality Checks

Run unit tests:

```bash
npm test
```

Run ESLint:

```bash
npm run lint
```

Run the build script:

```bash
npm run build
```

## Jenkins Pipeline

The Jenkinsfile contains the following stages:

1. Checkout
2. Install Dependencies
3. Quality Checks
   - Lint
   - Unit Tests
4. Build
5. Archive Artifacts
6. Deploy to Staging
7. Approval Gate
8. Deploy to Production

The `develop` branch runs the staging stage. The `main` branch requires approval before reaching the production deployment stage.

**Note:** The staging and production deployment steps currently contain demonstration messages. They do not perform an actual server deployment.

## Project Purpose

This project demonstrates the basic implementation of a Node.js API and a branch-based Jenkins CI/CD pipeline.