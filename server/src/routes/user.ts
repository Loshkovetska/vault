import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { dbService } from "../lib/firebase/db.js";
import { authFirebaseInit, getUserId } from "../lib/firebase/init.js";
import { generateExpiryDate } from "../lib/utils/date.js";
import { generateInternalCardNumber } from "../lib/utils/card.js";
import bcrypt from "bcrypt";

export async function userRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const auth = authFirebaseInit();

  fastify.post("/create", async (req, res) => {
    const { pin, ...payload } = JSON.parse(req.body as string) as Record<
      string,
      any
    >;
    console.log("payload", payload);

    const userPayload = {
      full_name: payload.full_name,
      bdate: payload.bdate,
      gender: payload.gender,
      image_url: payload.image_url ?? "",
      nationality: payload.nationality,
      email_verified: payload.email_verified,
      phone_verified: false,
      phone: "",
      biometric: true,
      is_verified: false,
      document: payload.document ?? "",
      personalized_ads: true,
      two_factor_auth: false,
      data_sharing: true,
      language: "en",
      transaction: true,
      promotion: true,
      security: true,
      monthly_report: true,
      newsletter: true,
    };

    await dbService.post("users", userPayload, payload.id);

    const cardPayload = {
      user_id: payload.id,
      balance: 0,
      card_number: generateInternalCardNumber(),
      card_holder: payload.full_name,
      expired_at: generateExpiryDate(),
      daily_limit: 500.0,
      status: "active",
      pin: bcrypt.hashSync(pin, 8),
    };

    await dbService.post("vault_cards", cardPayload);

    return res.status(200).send({ id: payload.id });
  });
  fastify.get("/profile", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    const userAuth = await auth.getUser(userId);

    const result = await dbService.getOne("users", userId);
    return res.status(200).send({
      id: result.id,
      email: userAuth.email,
      email_verified: userAuth.emailVerified ?? false,
      ...result.data(),
    });
  });
  fastify.put("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const payload = JSON.parse(req.body as string);
    const authUser = await auth.getUser(userId);
    if (payload.email !== authUser.email) {
      await auth.updateUser(userId, { email: payload.email });
    }
    await dbService.update("users", userId, payload as Record<string, any>);

    return res.status(200).send({
      data: null,
    });
  });
  fastify.put("/lang", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const payload = req.body;
    await dbService.update("users", userId, { language: payload });

    return res.status(200).send({
      data: null,
    });
  });
  fastify.put("/preferences", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const payload = JSON.parse(req.body as string);
    await dbService.update("users", userId, payload as Record<string, any>);

    return res.status(200).send({
      data: null,
    });
  });
  fastify.put("/verification", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    await dbService.update("users", userId, { is_verified: true });

    return res.status(200).send({
      data: null,
    });
  });
  fastify.delete("/", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    await auth.deleteUser(userId);
    await dbService.delete("users", userId);

    return res.status(200).send({
      data: null,
    });
  });
}
