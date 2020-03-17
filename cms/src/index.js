const server = require('./server');
const models = require('./models');
const config = require('./config');

server.listen(config.PORT, () => {
    models.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    });
});

const database = models.connection;
database.on('error', (err) => {
    console.log(err)
});

database.once('open', () => {
    // require('./routes/users')(server)
});
