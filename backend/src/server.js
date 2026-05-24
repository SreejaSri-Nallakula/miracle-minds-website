import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function bootstrap() {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is missing.");
  }

  await connectDB();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend started on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Backend bootstrap failed", error);
  process.exit(1);
});
