const server = require('./server');
const models = require('./models');
const config = require('./config');
const routes = require('./helpers/register-routes-by-path');
const path   = require('path');

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
    console.log(`Server running on Port: ${config.PORT}`);
    routes(server, path.join(__dirname, './routes'))
});
