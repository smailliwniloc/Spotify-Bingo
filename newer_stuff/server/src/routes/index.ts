import type {FastifyInstance} from "fastify";
import spotifyRoutes from "./spotify";

const routes = async (server: FastifyInstance) => {
    server.get('/ping', async (request, reply) => {
        return { message: 'pong' };
    });

    server.get('/hello', async (request, reply) => {
        return "Hello, world!";
    });

    server.register(spotifyRoutes, { prefix: '/spotify' });
};

export default routes;