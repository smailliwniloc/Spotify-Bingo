import fastify from 'fastify';
import cors from '@fastify/cors'
import routes from './routes';

const server = fastify({
  logger: true,
});

server.register(cors, {
  origin: '*',
});

server.register(routes, { prefix: '/api' });

server.listen({port: 3001}, function (err, address) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server listening on ${address}`);
})
