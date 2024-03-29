import { useDarkMode, useFirebaseAuth } from 'config/contexts';

import { useCountdown } from './useCountDown';
import { useHIITSets, useUser, useFeedback } from './useFirebaseDB';
import { useGaTracker } from './useGaTracker';
import { useLocalStorage } from './useLocalStorage';
import { useUIConfig } from './useUIConfig';
import { useWindowSize } from './useWindowSize';

export {
  useCountdown,
  useHIITSets,
  useUser,
  useFeedback,
  useDarkMode,
  useFirebaseAuth,
  useGaTracker,
  useLocalStorage,
  useUIConfig,
  useWindowSize
};
