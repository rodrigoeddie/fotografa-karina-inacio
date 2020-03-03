import * as restify from 'restify'

const server = restify.createServer();

server.get('/', (res, resp, next) => {
    resp.json({message: 'hello'});
    return next();
});

server.listen(3000, () => {
    console.log(`API ins running...`);
});
