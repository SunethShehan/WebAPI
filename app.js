let http = require('http');
let uppercase = require('upper-case')
let fileExtension = require('file-extension');
let mongoose = require('mongoose');

let express = require('express')
let app = express();

mongoose.connect('mongodb://localhost:27017/HeroDB', { useNewUrlParser: true });

let authenticator = require('./middleware/authenticator')
let sendemail = require('./middleware/emailsender')
let heroRoutes = require('./routes/heros')
let homeRoutes = require('./routes/home')

const PORT = 3000;

app.use(express.json());

app.use(authenticator);
app.use(sendemail);

//Custom middleware

app.use('/', homeRoutes);
app.use('/api/heros/', heroRoutes);


//specify only admin routes
//app.use('/api/admin',customAdminRoute);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));