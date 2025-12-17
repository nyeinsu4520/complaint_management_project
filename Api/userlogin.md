# API Endpoints

This section documents the REST APIs used in the service-oriented monolithic architecture. Each endpoint is mapped to a functional requirement to demonstrate traceability between requirements and implementation.

### FR-01: Users can register and log in to the system

Endpoint: POST /api/users/register/consumer

Functional Requirement: 
FR-01 – Users can register and log in to the system

**Description**
Registers a new customer (end user) in the system using basic personal details.

## Headers

- Content-Type: application/json


Request Body

```json{
  "email": "user@example.com",
  "username": "john_doe",
  "phoneNumber": "0123456789",
  "password": "password123",
  "address": "123 Main Street"
}


Response

 - 201 Created – Registration successful

 - 400 Bad Request – Invalid input or user already exists

Notes

 - Consumers are not assigned a staff role.

 - Consumers can submit complaints and provide feedback.


Endpoint: POST /api/users/register/internal

Functional Requirement
FR-01 – Users can register and log in to the system 

Description:
Registers an internal user such as help desk staff, support staff, or administrator.

Headers:

Content-Type: application/json

Request Body:

{
  "email": "staff@example.com",
  "username": "staff_user",
  "phoneNumber": "0798765432",
  "password": "password123",
  "address": "123 Office Street",
  "role": "HELP_DESK"
}


Response:

Status: 201 Created - Internal user successfully registered

Notes

Internal users are assigned a role (HELP_DESK, SUPPORT, ADMIN).

Internal users manage and resolve complaints.

Endpoint: POST /api/users/auth/login

Functional Requirement
FR-01 – Users can register and log in to the system

Description:
Authenticates a user using email and password.

Headers:

Content-Type: application/json

Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}


Response:

Status: 200 OK - Login successful

Returns authenticated user details

Notes

Role-based access control is applied after authentication.
