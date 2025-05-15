import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { auth } from '../services/spotify';




export const spotifyRoutes = (fastify: FastifyInstance) => {
    fastify.get('/auth', async (_request: FastifyRequest, reply: FastifyReply) => {
        const response = await auth();

        // reply.code(200).send({message: 'hi'});
        reply.redirect(response.spotifyUrl);
    });
}

export default spotifyRoutes;