import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService } from "../lib/firebase/db.js";
import { getUserId } from "../lib/firebase/init.js";
import bcrypt from "bcrypt";
import { ReqParams } from "../lib/index.js";

export async function vaultCardRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.get("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const result = await dbService.get(`vault_cards`, {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });
    const card = result?.docs?.[0];

    return res.status(200).send({ id: card.id, ...card.data() });
  });
  fastify.put("/status", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const status = req.body;

    const result = await dbService.get(`vault_cards`, {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });

    const card = result?.docs?.[0];

    await dbService.update("vault_cards", card.id, { status });

    return res.status(200).send({
      data: null,
    });
  });
  fastify.put("/balance", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const balance = req.body;

    const result = await dbService.get(`vault_cards`, {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });

    const card = result?.docs?.[0];

    await dbService.update("vault_cards", card.id, { balance });

    return res.status(200).send({
      data: null,
    });
  });
  fastify.put("/pin", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const pin = req.body;

    const result = await dbService.get(`vault_cards`, {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });

    const card = result?.docs?.[0];

    await dbService.update("vault_cards", card.id, {
      pin: bcrypt.hashSync(pin as string, 8),
    });

    return res.status(200).send({
      data: null,
    });
  });
  // additional calls
  fastify.get("/transactions", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const limit = Number((req.query as ReqParams)?.limit ?? "");

    const [withdraws, topups] = await Promise.all([
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "metadata.payment_method",
            operation: "==",
            value: "store_card",
          },
        ],
        limit,
      }),
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "type",
            operation: "==",
            value: "top_up",
          },
        ],
        limit,
      }),
    ]);
    const transactions = [...withdraws.docs, ...topups.docs].slice(
      0,
      limit || withdraws.size + topups.size,
    );

    return res.status(200).send(
      transactions.map((transaction) => ({
        id: transaction.id,
        ...transaction.data(),
      })),
    );
  });
  fastify.get("/analytics", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const cards = await dbService.get("vault_cards", {
      where: [{ field: "user_id", operation: "==", value: userId }],
    });
    if (!cards.size)
      return res.status(400).send({
        error: "Card info cannot be gotten",
      });
    const card = cards.docs[0];

    const [bills, transfers, withdraws, refunds] = await Promise.all([
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "metadata.method_id",
            operation: "==",
            value: card.id,
          },
          { field: "type", operation: "==", value: "bill" },
        ],
      }),
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "metadata.method_id",
            operation: "==",
            value: card.id,
          },
          { field: "type", operation: "==", value: "transfer" },
        ],
      }),
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "metadata.method_id",
            operation: "==",
            value: card.id,
          },
          { field: "type", operation: "==", value: "withdraw" },
        ],
      }),
      dbService.get("transactions", {
        where: [
          { field: "user_id", operation: "==", value: userId },
          {
            field: "metadata.method_id",
            operation: "==",
            value: card.id,
          },
          { field: "type", operation: "==", value: "refund" },
        ],
      }),
    ]);

    const metrics = {
      Bill: {
        list: bills.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        amount: bills.docs.reduce(
          (prev: any, d: any) => prev + d.data().amount,
          0,
        ),
      },
      Transfer: {
        list: transfers.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        amount: transfers.docs.reduce(
          (prev: any, d: any) => prev + d.data().amount,
          0,
        ),
      },
      Withdraw: {
        list: withdraws.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        amount: withdraws.docs.reduce(
          (prev: any, d: any) => prev + d.data().amount,
          0,
        ),
      },
      Refund: {
        list: refunds.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        amount: refunds.docs.reduce(
          (prev: any, d: any) => prev + d.data().amount,
          0,
        ),
      },
    };

    return res.status(200).send({
      metrics: Object.entries(metrics).map(([k, v]) => ({
        metric: k,
        amount: v.amount,
        data: v.list,
        total: v.list.length,
      })),
    });
  });
}
