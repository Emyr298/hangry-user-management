# Hangry User Management
User management API for Hangry recruitment test made in Node.js.

## Requirements
- Node.js
- PostgreSQL database

## Installation for Development
After cloning the repository, install required dependencies by running:
```
npm install
```

Create an `.env` file in the root directory that includes:
- `POSTGRES_URI`: PostgreSQL connection string URI. Example: `postgresql://postgres:postgres@localhost:5432/hangry`.
- `NODE_ENV`: Environment of the deployment. If the value is `production`, then database schema synchronization is not active, use migrations instead.

You can also look at the example in `.env.example` file.

To run the API, run `npm run start:dev`.

## Installation for Production
The procedures are similar to installation for development, except after setting the `.env`, run migrations on database schema by using:
```
npm run migrations:run
```

To run the API, run `npm run start:prod`

## API Documentation
### User Routes
`/api/users`

`GET`: Get all users.
```
{
    "users": [
        {
            "id": "a3ac4a1d-dcdb-4de5-812f-9feaaec933fd",
            "name": "Emir Shamsuddin Fadhlurrahman",
            "email": "emir@asd.com",
            "birthdate": "2003-02-01"
        },
        {
            "id": "0f7449df-d88a-4afb-9bf1-91a7b9fe3e1f",
            "name": "Ahmad Apala",
            "email": "ahmad@apala.com",
            "birthdate": "2004-10-01"
        }
    ]
}
```

`POST`: Create a user. Required fields are `name`, `email` (unique), and `birthdate` (in `YYYY-MM-DD` format).
Example Request:
```
{
    "name": "Emir Shamsuddin Fadhlurrahman",
    "email": "emir@asd.com",
    "birthdate": "2003-02-01"
}
```
Example Response:
```
{
    "message": "user created successfully",
    "user": {
        "name": "Emir Shamsuddin Fadhlurrahman",
        "email": "emir@asd.com",
        "birthdate": "2003-02-01",
        "id": "a3ac4a1d-dcdb-4de5-812f-9feaaec933fd"
    }
}
```

<br/>

`/api/users/<user-id>`

`GET`: Get the data of a user with id `<user-id>`.
```
{
    "user": {
        "id": "a3ac4a1d-dcdb-4de5-812f-9feaaec933fd",
        "name": "Emir Shamsuddin Fadhlurrahman",
        "email": "emir@asd.com",
        "birthdate": "2003-02-01"
    }
}
```

`PUT`: Update the data of a user with id `<user-id>`. Required fields are `name`, `email` (unique), and `birthdate` (in `YYYY-MM-DD` format).
Example Request:
```
{
    "name": "Emir S.F.",
    "email": "emir2@example.com",
    "birthdate": "2003-11-10"
}
```
Example Response:
```
{
    "message": "user updated successfully",
    "user": {
        "id": "a3ac4a1d-dcdb-4de5-812f-9feaaec933fd",
        "name": "Emir S.F.",
        "email": "emir2@example.com",
        "birthdate": "2003-11-10"
    }
}
```

`DELETE`: Delete a user with id `<user-id>`.
```
No Body (204 No Content)
```

### Errors
Every error has a response with different status code depending on the error.
```
{
    "error": "error message here"
}
```
