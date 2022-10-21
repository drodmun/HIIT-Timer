import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { User, HIITSet } from 'types';
import { doc, FirestoreError } from 'firebase/firestore';
import { db } from '../config/firebase/firebaseConf';
import { useFirebaseAuth } from '../config/contexts';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const useUser = (): {
  data: User | null;
  isLoading: boolean;
  error: FirestoreError | undefined;
} => {
  const { user } = useFirebaseAuth();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [value, loading, error] = useDocumentData(doc(db, 'users', user?.email || 'undefined'), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });

  useEffect(() => {
    if (!!error) {
      const snackbarKey = enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        onClick: () => closeSnackbar(snackbarKey)
      });
    }
  }, [closeSnackbar, enqueueSnackbar, error]);

  return { data: value as User, isLoading: loading, error };
};

export const useSavedSets = (): {
  data: HIITSet[];
  isLoading: boolean;
  error: FirestoreError | undefined;
} => {
  const { data: user, isLoading, error } = useUser();

  return { data: user?.presets ?? [], isLoading, error };
};
