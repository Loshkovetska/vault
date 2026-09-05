import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService } from "../lib/firebase/db.js";
import { getUserId } from "../lib/firebase/init.js";
import { ReqParams } from "../lib/index.js";

export async function bankAccountRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const result = await dbService.get("bank_accounts", {
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
    const result = await dbService.getOne("bank_accounts", id);

    return res.status(200).send({ id: result.id, ...result.data() });
  });
  fastify.put("/:id", async (req, res) => {
    const id = (req.params as ReqParams)?.id;
    const body = JSON.parse(req.body as string);
    await dbService.update("bank_accounts", id, body as object);

    return res.status(200).send({
      data: null,
    });
  });
  fastify.delete("/:id", async (req, res) => {
    const id = (req.params as ReqParams)?.id;
    await dbService.delete("bank_accounts", id);

    return res.status(200).send({
      data: null,
    });
  });
  fastify.post("/connect", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const body = JSON.parse(req.body as string) as Record<string, any>;
    await dbService.post("bank_accounts", { ...body, user_id: userId });
    return res.status(200).send({
      data: null,
    });
  });
}
