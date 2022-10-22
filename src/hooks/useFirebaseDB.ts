import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { User } from 'types';
import { addDoc, arrayUnion, collection, doc, FirestoreError, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebaseConf';
import { useFirebaseAuth } from '../config/contexts';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRecoilValue } from 'recoil';
import { hiitConfigurationAtom } from '../stores/timers';
import CommonUtils from '../utils/CommonUtils';

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

export const useHIITSets = () => {
  const { data: user, isLoading, error } = useUser();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);

  const getSavedSets = useCallback(
    () => ({ data: user?.presets ?? [], isLoading, error }),
    [error, isLoading, user?.presets]
  );

  const isSetAlreadySaved: boolean = useMemo(
    () =>
      user?.presets.some((set) => CommonUtils.areObjectsDeeplyEqual(set.hiitConfiguration, hiitConfiguration)) || false,
    [hiitConfiguration, user?.presets]
  );

  const saveSet = useCallback(
    (name: string) => {
      if (user?.email) {
        let snack: { message: string; variant: VariantType | undefined };
        updateDoc(doc(db, 'users', user.email), {
          presets: arrayUnion({
            creator: user.email,
            name,
            hiitConfiguration
          })
        })
          .then((value) => {
            console.log(value);
            snack = { message: `Set saved as ${name}, thanks!`, variant: 'success' };
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
    [closeSnackbar, enqueueSnackbar, hiitConfiguration, user?.email]
  );

  return { hiitConfiguration, getSavedSets, saveSet, isSetAlreadySaved };
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
