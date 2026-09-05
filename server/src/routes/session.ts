import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService } from "../lib/firebase/db.js";
import { getUserId } from "../lib/firebase/init.js";
import { ReqParams } from "../lib/index.js";

export async function sessionRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const result = await dbService.get("sessions", {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });

    return res.status(200).send(
      (result.docs ?? []).map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  });
  fastify.get("/:id", async (req, res) => {
    const id = (req.params as ReqParams)?.id;
    const result = await dbService.getOne("sessions", id);

    return res.status(200).send({ id: result.id, ...result.data() });
  });
  fastify.post("/", async (req, res) => {
    const payload = JSON.parse(req.body as string) as Record<string, any>;
    const result = await dbService.post("sessions", payload);

    return res.status(200).send({
      data: result.id,
    });
  });
  fastify.delete("/:id", async (req, res) => {
    const id = (req.params as ReqParams)?.id;
    await dbService.delete("sessions", id);

    return res.status(200).send({
      data: null,
    });
  });
}
