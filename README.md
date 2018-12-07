# SNEAKERS AND GO

## Development server
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. It uses `nodemon` so the app will automatically reload if you change any of the source files.

## .ENV
Be sure to fill the `.env` file.

Example :
```dotenv
PORT = '4000'
MONGODB_URI = 'mongodb://localhost:27017/sneakersngo'
JWT_SECRET = 'OIç8Y9Sds$ùD09èé.:ùpsofudDS'
```

## ROUTES

### Auth

`POST /auth/register`

`POST /auth/login`

`GET /auth/confirmation/:confirmationHash`

### Brand

`POST /brand`

`GET /brand`

`GET /brand/:brandId`

`DELETE /brand/:brandId`

### Model

`POST /model`

`GET /model`

`GET /model/:modelId`

`GET /model/brand/:brandId`

`DELETE /model/:modelId`

### SNEAKERS
