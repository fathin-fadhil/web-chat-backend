require('dotenv').config()

const { socketConnection } = require('./service/socket-io');
const bodyParser = require('body-parser')
const database = require('./config/database')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var express = require('express')
var app = express()

const db = require("./app/model");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
const messageRouter = require('./routes/message')

app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', roomRouter)
app.use('/api/v1', messageRouter)

if(process.env.APP_ENV != 'production'){
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const server = app.listen(process.env.APP_PORT, () => {
    console.log(`listening on port ${process.env.APP_PORT}!`)
})

socketConnection(server);

