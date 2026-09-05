import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService } from "../lib/firebase/db.js";
import { getUserId } from "../lib/firebase/init.js";
import { ReqParams } from "../lib/index.js";

export async function promosRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const result = await dbService.get("promos", {
      where: [
        {
          field: "user_id",
          operation: "==",
          value: userId as string,
        },
      ],
    });

    return res.status(200).send(
      result.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  });
  fastify.get("/:id", async (req, res) => {
    const id = (req.params as ReqParams)?.id;
    const result = await dbService.getOne("promos", id);

    return res.status(200).send({ id: result.id, ...result.data() });
  });
}
