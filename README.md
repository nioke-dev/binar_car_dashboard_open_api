# Binar Car Rental

## Guide to Run

- `npm i` to install all the dependencies
- Don't forget to make your own `.env` based on `example.env`
- When its finish:
  - `npm run build:watch`
  - `npm run dev`

## Migrations and Seeds

- `knex migrate:latest`
- `knex seed:run`

## Endpoints

### Frontend

| URL     | Description          |
| ------- | -------------------- |
| `/`     | index (landing page) |
| `/cars` | Find Available Car   |

### Auth

| Method   | URL                  | Description       |
| -------- | -------------------- | ----------------- |
| **POST** | `/api/auth/register` | Register New User |
| **POST** | `/api/auth/login`    | Login User        |

### User

| Method  | URL               | Description   |
| ------- | ----------------- | ------------- |
| **GET** | `/api/users/user` | Show All User |

### Backend

| Method     | URL             | Description                                   |
| ---------- | --------------- | --------------------------------------------- |
| **GET**    | `/api/cars/`    | Display all cars data from database           |
| **GET**    | `/api/cars/:id` | Display specific car data from database by ID |
| **POST**   | `/api/cars/`    | Create car data to database                   |
| **UPDATE** | `/api/cars/:id` | Update specific car data from database by ID  |
| **DELETE** | `/api/cars/:id` | Delete specific car data from database by ID  |

### Documentations

| URI     | Description                   |
| ------- | ----------------------------- |
| `/docs` | Documentation Swagger OpenAPI |
