import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  WhereFilterOp,
  orderBy,
  OrderByDirection,
  getDoc,
  limit,
  startAt,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  Firestore,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { firebaseInit } from './init';

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
    const filters = [];
    if (opts?.where) {
      opts.where.map(({ field, operation, value }) => {
        filters.push(where(field, operation, value));
      });
    }
    if (opts?.limit) {
      filters.push(limit(opts.limit));
    }
    if (opts?.orderBy) {
      const { field, direction } = opts.orderBy;
      filters.push(orderBy(field, direction));
    }
    if (opts?.search) {
      filters.push(startAt(opts.search));
    }
    return getDocs(
      query(collection(this.db, path, ...(opts?.segments ?? [])), ...filters),
    );
  }
  getOne(path: string, segment: string) {
    return getDoc(doc(this.db, path, segment));
  }
  getIn(path: string, segments: string[]) {
    return getDocs(
      query(collection(this.db, path), where('id', 'in', segments)),
    );
  }
  async post<T extends { [x: string]: any }>(
    path: string,
    data: T,
    subpath?: string,
  ) {
    if (subpath) {
      const reference = doc(this.db, path, subpath);
      await setDoc(reference, data);
      return getDoc(reference);
    }
    const reference = collection(this.db, path);

    return addDoc(reference, data);
  }
  update<T extends object>(path: string, segment: string, data: T) {
    return updateDoc(doc(collection(this.db, path), segment), data);
  }
  delete(path: string, segment: string) {
    return deleteDoc(doc(this.db, path, segment));
  }
  snapshot(
    path: string,
    onSuccess: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
    onError?: () => void,
  ) {
    return onSnapshot(collection(this.db, path), {
      next: onSuccess,
      error: onError,
    });
  }
}

export const dbService = new DBService();
