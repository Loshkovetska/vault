import {
  getFirestore,
  WhereFilterOp,
  OrderByDirection,
  DocumentData,
  QuerySnapshot,
  Firestore,
} from "firebase-admin/firestore";
import { firebaseInit } from "./init.js";

export type FilterOpts = {
  where?: {
    field: string;
    operation: WhereFilterOp;
    value: string | number | boolean;
  }[];
  orderBy?: {
    field: string;
    direction: OrderByDirection;
  };
  search?: string;
  segments?: string[];
  limit?: number;
};
class DBService {
  db: Firestore;
  constructor() {
    const app = firebaseInit();
    this.db = getFirestore(app);
  }

  get(path: string, opts?: FilterOpts) {
    const paths = [path, ...(opts?.segments ?? [])].join("/");
    let request: any = this.db.collection(paths);
    if (opts?.where) {
      opts.where.map(({ field, operation, value }) => {
        request = request.where(field, operation, value);
      });
    }
    if (opts?.limit) {
      request = request.limit(opts.limit);
    }
    if (opts?.orderBy) {
      const { field, direction } = opts.orderBy;
      request = request.orderBy(field, direction);
    }
    if (opts?.search) {
      request = request.startAt(opts.search);
    }
    return request.get();
  }
  getOne(path: string, segment: string) {
    const paths = [path, segment].join("/");
    return this.db.doc(paths).get();
  }
  getIn(path: string, segments: string[]) {
    return this.db.collection(path).where("id", "in", segments);
  }
  async post<T extends { [x: string]: any }>(
    path: string,
    data: T,
    subpath?: string,
  ) {
    if (subpath) {
      return await this.db.collection(path).doc(subpath).set(data);
    }
    return (await this.db.collection(path).add(data)).get();
  }
  update<T extends object>(path: string, segment: string, data: T) {
    const paths = [path, segment].join("/");
    return this.db.doc(paths).update(data);
  }
  delete(path: string, segment: string) {
    const paths = [path, segment].join("/");
    return this.db.doc(paths).delete();
  }
  snapshot(
    path: string,
    onSuccess: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
    onError?: () => void,
  ) {
    return this.db.collection(path).onSnapshot(onSuccess, onError);
  }
}

export const dbService = new DBService();
