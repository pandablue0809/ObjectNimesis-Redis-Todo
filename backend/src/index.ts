import Fastify from 'fastify';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import fastifyCors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to handle cookies and credentials
});

fastify.register(userRoutes);
fastify.register(taskRoutes);

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
