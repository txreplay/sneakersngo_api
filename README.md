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

`POST /auth/register` (Anon)

`POST /auth/login` (Anon)

`GET /auth/confirmation/:confirmationHash` (Anon)

### Brand

`POST /brand` (Admin)

`GET /brand` (Anon)

`GET /brand/:brandId` (Anon)

`DELETE /brand/:brandId` (Admin)

### Model

`POST /model` (Admin)

`GET /model` (Anon)

`GET /model/:modelId` (Anon)

`GET /model/brand/:brandId` (Anon)

`DELETE /model/:modelId` (Admin)

### SNEAKERS

`POST /sneaker` (Admin)

`GET /sneaker` (Anon)

`GET /sneaker/:sneakerId` (Anon)

`GET /sneaker/model/:modelId` (Anon)

`DELETE /sneaker/:sneakerId` (Admin)

### USERS

`PATCH /user` (Logged)

`GET /user/:id` (Same user)

`GET /user/:id/rents` (Same user)

`GET /user` (Admin)

### RENTS

`POST /rent` (Logged)

`GET /rent/:id` (Same user)

`GET /rent` (Admin)

`PATCH /rent/status/:status` (Admin)

### STATS

`POST /stats/user` (Admin)

`GET /rent/:id` (Same user)


### REQUEST

`POST /request` (Logged)

`GET /request/:id` (Admin)

`GET /request` (Admin)

### WISHLIST

`POST /wishlist` (Logged)

`GET /wishlist/:id` (Same user)

`DELETE /wishlist/:id` (Same user)
