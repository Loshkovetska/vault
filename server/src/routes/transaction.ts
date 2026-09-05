import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService, FilterOpts } from "../lib/firebase/db.js";
import { getUserId } from "../lib/firebase/init.js";
import { ReqParams } from "../lib/index.js";

export async function transactionRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const query = req.query as Record<"type" | "q" | "user_id", any>;
    const search = query?.q ?? "";
    const type = query?.type;

    const where: FilterOpts["where"] = [
      { field: "user_id", operation: "==", value: userId as string },
    ];

    if (type !== "all") {
      where.push({ field: "type", operation: "==", value: type });
    }

    const result = await dbService.get("transactions", {
      where,
      orderBy: { field: "created_at", direction: "desc" },
      search: search.length ? search : undefined,
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
    const result = await dbService.getOne("transactions", id);

    return res.status(200).send({ id: result.id, ...result.data() });
  });
  fastify.get("/recent", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const opts: FilterOpts = {
      where: [{ field: "user_id", operation: "==", value: userId }],
      orderBy: { field: "created_at", direction: "desc" },
      limit: 5,
    };
    const result = await dbService.get("transactions", opts);

    return res.status(200).send(
      (result.docs ?? []).map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })),
    );
  });
  fastify.post("/create", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const payload = JSON.parse(req.body as string) as Record<string, any>;
    await dbService.post("transactions", {
      user_id: userId,
      ...payload,
    });

    return res.status(200).send({
      data: null,
    });
  });
}
