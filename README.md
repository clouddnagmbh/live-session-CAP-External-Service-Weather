# 🌦️ 02 – Consuming REST Service

This branch extends the initial CAP project by integrating an external REST service (OpenWeatherMap) and implementing a custom OData action.

In this step, we connect CAP to OpenWeatherMap via `cds.requires` and implement an action handler that:

1. Reads the stored coordinates for a city from the database  
2. Calls the OpenWeatherMap REST API using those coordinates  
3. Updates the temperature of the city in the local database  
4. Returns the current temperature as the action result  

⚠️ In this branch, we focus purely on configuration and implementation.  
The application is **not executed yet**. Runtime and testing will follow in branch 03.

---

## 🎯 Objectives of This Step

- Configure an external REST service in CAP (`cds.requires`)
- Consume OpenWeatherMap from within a CAP service handler
- Implement a custom OData action: `updateTemperature(city)`
- Update local persistence based on external API data
- Prepare the project for execution in the next branch

---

## 🗂 Relevant Files

```
.
├── db/
│   └── schema.cds
├── srv/
│   ├── service.cds
│   └── service.js
└── package.json
```

- `package.json` → REST service configuration (`weatherservice`)
- `srv/service.cds` → OData service + action definition
- `srv/service.js` → action implementation (REST call + DB update)
- `db/schema.cds` → domain model (incl. coordinates + temperature fields)

---

## 🌐 External Service Configuration

In `package.json`, the OpenWeatherMap API is configured using `cds.requires`.

Conceptually:

- Define a required service (`weatherservice`)
- Set `kind: "rest"`
- Provide the base URL of the OpenWeatherMap API
- Add required headers (API key)

This allows CAP to treat the external REST API like a service connection.

At this stage:
- The configuration exists
- The handler logic is implemented
- No runtime execution is performed yet

---

## ⚙️ Action Definition

In `srv/service.cds`, a custom action is defined:

```
action updateTemperature(city: String) returns Decimal;
```

This action:

- Accepts a city name
- Triggers the REST call
- Updates the temperature in the `Location` entity
- Returns the current temperature

The action is defined structurally but will be executed in the upcoming branch.

---

## 🧠 Action Implementation

In `srv/service.js`, the logic is implemented.

High-level flow:

1. Retrieve the `Location` by city
2. Extract longitude and latitude
3. Call OpenWeatherMap via `weatherservice`
4. Read `main.temp` from the response
5. Update the `Location.temperature` field
6. Return the temperature

This is where CAP connects local persistence with external data.

---

## 🔄 Runtime Flow (Conceptual)

Once executed (in the next branch), the process will look like this:

Client → OData Action → CAP Handler → OpenWeatherMap REST API  
→ CAP updates local DB → Response returned to client

---

## 🧠 What You Learned in This Branch

- How to configure external REST services in CAP
- How to use `cds.connect.to()` for REST integration
- How to implement custom OData actions
- How to combine external API data with local persistence
- How to prepare service logic before runtime execution

---

This branch prepares the integration layer.  
In the next step we will add sample data and execute the application including action calls. 🌦️