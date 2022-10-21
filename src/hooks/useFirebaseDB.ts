import { useCallback, useEffect } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { User, HIITSet } from 'types';
import { addDoc, collection, doc, FirestoreError } from 'firebase/firestore';
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

export const useFeedback = () => {
  const { data: user } = useUser();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const send = useCallback(
    (feedback: string) => {
      if (user?.email) {
        let snack: { message: string; variant: VariantType | undefined };
        addDoc(collection(db, 'feedback'), {
          feedback: feedback,
          user: user.email
        })
          .then((value) => {
            console.log(value);
            snack = { message: 'Feedback sent, thanks!', variant: 'success' };
          })
          .catch((error) => (snack = { message: error.message, variant: 'error' }))
          .finally(() => {
            const snackbarKey = enqueueSnackbar(snack.message, {
              variant: snack.variant,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              onClick: () => closeSnackbar(snackbarKey)
            });
          });
      }
    },
    [closeSnackbar, enqueueSnackbar, user?.email]
  );

  return { send };
};
