export type SignInViaProvider =
  | {
      id: string;
    }
  | { uid: string; displayName: string | null; photoURL: string | null };
