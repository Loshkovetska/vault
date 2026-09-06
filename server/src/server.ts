import Fastify from "fastify";
import { bankAccountRoutes } from "./routes/bank-account.js";
import { cardRoutes } from "./routes/card.js";
import { promosRoutes } from "./routes/promos.js";
import { transactionRoutes } from "./routes/transaction.js";
import { userRoutes } from "./routes/user.js";
import { sessionRoutes } from "./routes/session.js";
import { vaultCardRoutes } from "./routes/vault-card.js";
import { authRoutes } from "./routes/auth.js";
import { notificationRoutes } from "./routes/notification.js";
import fastifyCookies from "@fastify/cookie";
import { fastifySchedule } from "@fastify/schedule";
import { sessionJob, transactionJob } from "./lib/cron.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCookies);
fastify.register(fastifySchedule);

fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(sessionRoutes, { prefix: "/api/sessions" });
fastify.register(userRoutes, { prefix: "/api/users" });

fastify.register(notificationRoutes, { prefix: "/api/notifications" });
fastify.register(bankAccountRoutes, { prefix: "/api/bank-accounts" });
fastify.register(cardRoutes, { prefix: "/api/registered-cards" });
fastify.register(promosRoutes, { prefix: "/api/promos" });
fastify.register(transactionRoutes, { prefix: "/api/transactions" });
fastify.register(vaultCardRoutes, { prefix: "/api/vault-card" });

fastify.ready().then(() => {
  fastify.scheduler.addSimpleIntervalJob(transactionJob);
  fastify.scheduler.addSimpleIntervalJob(sessionJob);
});

// Run the server!
fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    fastify.scheduler.stop();
    process.exit(1);
  }
});
