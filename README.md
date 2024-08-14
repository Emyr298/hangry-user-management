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
            "id": "60161861-632d-45c0-8c56-a373f4f964e6",
            "name": "123 123",
            "email": "test@test.com",
            "birthdate": "2003-01-01"
        },
        {
            "id": "e6b6832c-15c3-4da2-b10f-2f18f392b2cc",
            "name": "123 123",
            "email": "test@test12.com",
            "birthdate": "2003-12-01"
        }
    ]
}
```

`POST`: Create a user. Required fields are `name`, `email` (unique), and `birthdate` (in `YYYY-MM-DD` format).
```
{
    "message": "user created successfully",
    "user": {
        "name": "123 123",
        "email": "test@asd.com",
        "birthdate": "2003-12-01",
        "id": "f2035465-3c00-4b4b-ad5a-b0f410d7d873"
    }
}
```

<br/>

`/api/users/<user-id>`

`GET`: Get the data of a user with id `<user-id>`.
```
{
    "user": {
        "id": "60161861-632d-45c0-8c56-a373f4f964e6",
        "name": "123 123",
        "email": "test@test.com",
        "birthdate": "2003-01-01"
    }
}
```

`PUT`: Update the data of a user with id `<user-id>`. Required fields are `name`, `email` (unique), and `birthdate` (in `YYYY-MM-DD` format).
```
{
    "message": "user updated successfully",
    "user": {
        "id": "60161861-632d-45c0-8c56-a373f4f964e6",
        "name": "Testos BaruZ",
        "email": "test@test2.com",
        "birthdate": "2003-01-01"
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
