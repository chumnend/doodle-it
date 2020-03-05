# Doodle It Backend
A web application for drawing in the browser

## Endpoints
- /v1/auth/register - create a user
- /v1/auth/login - log in with credentials
- /v1/doodle - access doodles (requires user id and authorization)
- /v1/doodle/:id - access specific doodle (requires user id and authorization)

## Notes
- ?apiKey=<API KEY> to acccess the api
- ?userId=<USER ID> to access user items on item routes
