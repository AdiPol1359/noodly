import ajvErrors from 'ajv-errors';

import { initPosts } from 'modules/posts/posts.model';
import { createServer } from 'server';

const start = async () => {
  try {
    await initPosts();

    const server = await createServer({
      ajv: {
        customOptions: {
          allErrors: true,
        },
        plugins: [ajvErrors],
      },
    });
    const address = await server.listen({ host: server.config.HOST, port: server.config.PORT });

    console.log(`✨ Started at ${address}!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

void start();
