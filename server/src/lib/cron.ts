import { SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import { JOBS } from "./constants.js";
import { dbService } from "./firebase/db.js";
import { FidMessage, getMessaging } from "firebase-admin/messaging";

const transactionTask = new AsyncTask(
  JOBS.transaction,
  async () => {
    const transactions = await dbService.get("transactions", {
      where: [
        { field: "notification_sent", operation: "==", value: false },
        { field: "status", operation: "==", value: "SUCCESS" },
      ],
    });
    for (let transaction of transactions) {
      const data = transaction.data();
      if (data?.user_id) {
        const user = (await dbService.getOne("users", data.user_id))?.data();
        if (user?.fmToken && user.transaction) {
          const message: FidMessage = {
            data: {
              type: "transaction",
              title: `Transaction #${transaction.id} Completed`,
              body: "Navigate to see details",
              id: transaction.id,
            },
            fid: user?.fmToken,
          };

          await getMessaging().send(message);
          await dbService.post("notification", {
            user_id: data.user_id,
            type: "transaction",
            title: `Transaction #${transaction.id} Completed`,
            text: "Navigate to see details",
            created_at: new Date().toISOString(),
            metadata: {
              transaction_id: transaction.id,
            },
          });
          await dbService.update("transactions", transaction.id, {
            notification_sent: true,
          });
        }
      }
    }
  },
  (err) => {
    /* handle errors here */
  },
);
const sessionTask = new AsyncTask(
  JOBS.session,
  () => {
    return dbService.get("sessions");
  },
  (err) => {
    /* handle errors here */
  },
);
export const transactionJob = new SimpleIntervalJob(
  { seconds: 20 },
  transactionTask,
);

export const sessionJob = new SimpleIntervalJob({ seconds: 20 }, sessionTask);
