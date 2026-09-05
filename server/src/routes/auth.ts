import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authFirebaseInit, getUserId } from "../lib/firebase/init.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { dbService } from "../lib/firebase/db.js";

export async function authRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const auth = authFirebaseInit();

  fastify.post("/sign-in/credentials", async (req, res) => {
    const payload = JSON.parse(req.body as string) as Record<
      "email" | "password",
      string
    >;

    const creds = await auth.getUserByEmail(payload.email);
    if (!creds) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const isEqual = bcrypt.compareSync(
      payload.password,
      creds.passwordHash ?? "",
    );

    if (!isEqual) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const user = await dbService.getOne("users", creds.uid);
    if (!user) {
      return res.status(400).send({
        error: "Invalid credentials",
      });
    }
    return res.status(200).send({
      id: user.id,
    });
  });

  fastify.post("/sign-in/google", async (req, res) => {
    const payload = req.body as string;
    const authClient = new OAuth2Client(
      "44336898427-2blcp7c3j96qdm4g4kgldvevckn3brno.apps.googleusercontent.com",
    );
    const ticket = await authClient.verifyIdToken({
      idToken: payload,
    });

    if (!ticket) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const result = await auth.getUserByEmail(ticket.getPayload()?.email ?? "");

    if (!result) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const user = await dbService.getOne("users", result.uid);
    if (!user.exists) {
      return res.status(200).send({
        uid: result?.uid,
        displayName: result?.displayName,
        photoURL: result?.photoURL,
      });
    }
    return res.status(200).send({ id: user?.id });
  });

  fastify.post("/sign-in/apple", async (req, res) => {
    const payload = req.body as string;
    const verifiedToken = await auth.verifyIdToken(payload);

    if (!verifiedToken) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const result = await auth.getUserByEmail(verifiedToken?.email ?? "");
    if (!result) {
      return res.status(400).send({
        error: "Failed to sign in",
      });
    }
    const user = await dbService.getOne("users", result.uid);
    if (!user.exists) {
      return res.status(200).send({
        uid: result?.uid,
        displayName: result?.displayName,
        photoURL: result?.photoURL,
      });
    }
    return res.status(200).send({ id: user?.id });
  });

  fastify.post("/sign-up", async (req, res) => {
    const payload = JSON.parse(req.body as string) as Record<
      "email" | "password",
      string
    >;

    const result = await auth.createUser({
      email: payload.email,
      password: payload.password,
      emailVerified: false,
    });

    return res.status(200).send({ uid: result.uid });
  });

  fastify.patch("/update/email", async (req, res) => {
    const email = req.body as string;
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    await auth.updateUser(userId, { email, emailVerified: false });

    return res.status(200).send(null);
  });

  fastify.patch("/update/password", async (req, res) => {
    const password = req.body as string;
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }

    await auth.updateUser(userId, { password });

    return res.status(200).send({
      data: null,
    });
  });

  fastify.delete("/destroy", async (req, res) => {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).send({ error: "Unauthorized! Log out" });
    }
    const user = await auth.getUser(userId);

    await auth.deleteUser(user.uid);

    return res.status(200).send(null);
  });
}
