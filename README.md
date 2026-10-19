# 🌦️ 03 – Sample Data and Action Execution

This branch represents the final step of the live session.

Here, we complete the application by:

- Adding CSV-based sample data
- Running the CAP application
- Executing the custom OData action
- Persisting updated temperature values
- Combining local database content with external weather data

This is the first branch where the application is fully executed and tested end-to-end.

---

## 🎯 Objectives of This Step

- Seed the database using CSV files
- Start the CAP application
- Execute the `updateTemperature` action
- Persist live weather data locally
- Verify the full runtime flow

---

## 🗂 Project Structure (Final State)

```
.
├── db/
│   ├── schema.cds
│   └── data/
│       ├── at.clouddna.Weather-Customer.csv
│       ├── at.clouddna.Weather-Location.csv
│       └── at.clouddna.Weather-OperatedIn.csv
├── srv/
│   ├── service.cds
│   └── service.js
└── package.json
```

New in this branch:

- `db/data/` → CSV files for automatic database initialization

---

## 📄 Creating Sample Data

You can generate the CSV template files automatically using:

```bash
cds add data
```

This creates the corresponding CSV files for your entities inside `db/data/`.

You can then fill them with initial test data (e.g. customers, cities, coordinates).

---

## ▶️ Running the Application

Install dependencies (if not already done):

```bash
npm install
```

Start the CAP server:

```bash
cds watch
```

During startup, you should see output indicating:

- SQLite database initialization
- CSV data import
- Service exposure

The service will run locally at:

```
http://localhost:4004/odata/v4/sensor-data
```

---

## 🔄 Full Runtime Flow

Now the complete integration works end-to-end:

1. Client calls the `updateTemperature` action
2. CAP retrieves the location and its coordinates
3. Open-Meteo REST API is called
4. Temperature is extracted from the response
5. The local `Location.temperature` field is updated
6. The updated temperature is returned to the client

This combines:

- Local persistence
- External REST consumption
- OData action execution

---

## 🧪 Testing the Action

Example request:

```
POST /odata/v4/sensor-data/updateTemperature
```

Payload:

```
{
  "city": "Berlin"
}
```

After execution:

- The temperature is returned in the response
- The `Location` entry is updated in the database

You can verify the update via:

```
GET /odata/v4/sensor-data/Location
```

---

## 🧠 What You Learned in This Branch

- How CAP loads CSV sample data automatically
- How to generate CSV templates using `cds add data`
- How to deploy to SQLite using `cds deploy --to sqlite`
- How to execute custom OData actions
- How to persist results from external REST calls
- How to validate runtime behavior
- How to combine modeling, service logic, and integration into a complete CAP application

---

## ✅ Final Result

At this stage, you have a fully functional CAP application that:

- Manages customers and locations
- Stores geographic coordinates
- Fetches live weather data from Open-Meteo
- Persists temperature data locally
- Exposes everything via OData V4

This concludes the live session implementation. 🌦️🚀

---

Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0). The free API is for non-commercial use.
