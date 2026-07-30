import { DocumentData, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { dbService } from '../firebase/db';

type UseSubscribe = {
  collection: 'sessions' | 'notifications';
  onSuccess: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void;
  onError?: () => void;
};

export function useSubscribe({ collection, onSuccess, onError }: UseSubscribe) {
  const collectionRef = useRef(collection);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  collectionRef.current = collection;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  useEffect(() => {
    let subscribe: Unsubscribe | null = null;
    const setup = async () => {
      subscribe = dbService.snapshot(
        collectionRef.current,
        onSuccessRef.current,
        onErrorRef.current,
      );
    };

    setup();
    return () => {
      if (subscribe) {
        subscribe();
      }
    };
  }, []);

  return null;
}
