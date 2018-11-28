# SNEAKERS AND GO
---

## Development server
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. It uses `nodemon` so the app will automatically reload if you change any of the source files.

## .env
Be sure to fill the `.env` file.

Example :
```dotenv
PORT = '4000'
MONGO_URL = 'mongodb://localhost:27017/sneakersngo'
JWT_SECRET = 'OIç8Y9Sds$ùD09èé.:ùpsofudDS'
```

## Routes

### Auth

`POST /auth/register`

`POST /auth/login`