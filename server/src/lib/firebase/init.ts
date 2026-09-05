import admin, { ServiceAccount } from "firebase-admin";
import * as firebaseAuth from "firebase-admin/auth";
import serviceAccount from "../../../vault-57584-firebase-adminsdk-fbsvc-f46c43812c.json";
import { APIRequest } from "../index.js";
import { dbService } from "./db.js";

export function firebaseInit() {
  const app =
    admin.getApps().length === 0
      ? admin.initializeApp({
          credential: admin.cert(serviceAccount as ServiceAccount),
        })
      : admin.getApp();

  return app;
}

export function authFirebaseInit() {
  const auth = firebaseAuth.getAuth();

  return auth;
}

// for test needs
export async function getUserId(req: APIRequest): Promise<string | null> {
  if (!req.cookies.sessionID) return null;

  const user = await dbService.getOne("sessions", req.cookies.sessionID);
  if (user) return user?.data()?.user_id;
  return null;
}
