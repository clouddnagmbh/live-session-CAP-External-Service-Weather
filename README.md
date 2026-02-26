# 🌦️ Consuming External Services – Weather

This repository is structured as a step-by-step workshop demonstrating how to consume an external REST service [OpenWeatherMap](https://openweathermap.org/api) within an SAP Cloud Application Programming Model (CAP) application.

Each branch represents a dedicated stage of the development process.
The `main` branch contains the final, completed version of the application.

The project shows how to:
- Define a CAP data model
- Expose an OData V4 service
- Consume an external REST API
- Transform and return external data
- Seed local sample data
- Implement and execute custom actions

---

## 🚀 Step-by-Step Workshop Branches

Below is an overview of the branches and their focus areas:

---

* [**01 - Initial Setup**](https://github.com/clouddnagmbh/live-session-CAP-external-service-weather/tree/01-initial-setup)

  * **Focus:**
      - Basic CAP project structure
      - Defining the domain model in `db/schema.cds`
      - Creating the OData service definition in `srv/service.cds`

---

* [**02 - Consuming REST Service**](https://github.com/clouddnagmbh/live-session-CAP-external-service-weather/tree/02-consuming-rest-service)

  * **Focus:**
      - Integrating an external REST API (OpenWeatherMap)
      - Implementing custom service logic in `srv/service.js`
      - Calling the external API using Node.js
      - Mapping external JSON response to CAP entities
      - Returning live weather data via OData
   
---

* [**03 - Sample Data and Action**](https://github.com/clouddnagmbh/live-session-CAP-external-service-weather/tree/03-sample-data-and-action)

  * **Focus:**
      - Adding CSV-based sample data in `db/data`
      - Persisting entities locally
      - Implementing custom OData actions
      - Executing actions via OData endpoints
      - Combining local persistence with external weather data
   
---

## 🧩 Project Architecture Overview

The final application (main branch) consists of:
- **db/** → CDS data model & sample data
- **srv/** → Service definition & business logic
- **External REST Integration** → OpenWeatherMap API
- **SQLite (in-memory)** for local development

High-level flow:
1. Client calls OData endpoint
2. CAP service handler executes custom logic
3. External weather API is called
4. Response is transformed
5. Result is returned via OData

---

## ▶️ Running the Final Application

```bash
npm install
cds watch
```

The service will be available at:
`http://localhost:4004/odata/v4/sensor-data`

---

## 🧪 Example Use Case

The application allows you to:
- Manage locations and related entities
- Fetch live weather data for a location
- Execute custom actions exposed via OData
- Work with seeded sample data locally

---

## 🎯 Learning Objectives

After completing all branches, you will understand:
- How to structure a CAP project
- How to consume external REST service in CAP
- How to implement custom service handlers
- How to combine local persistence with external APIs
- How to expose actions in OData V4

---

## 🛠 Technologies Used

- SAP Cloud Application Programming Model (CAP)
- Node.js
- OData V4
- SQLite
- OpenWeatherMap REST API

---

## 🔀 How to Use These Branches

You can explore a specific step locally by checking out the branch:
`git checkout 01-initial-setup`

Or start directly with the completed implementation:
`git checkout main`
