import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ColorHex, CountdownCircleTimer } from 'react-countdown-circle-timer';
import useSound from 'use-sound';
import beep from 'assets/sounds/beep.mp3';
import { Typography } from '@mui/material';
import { hiitConfigurationAtom, isPausedAtom, isPlaySoundAtom, isRunningAtom } from 'stores/timers';
import { useDarkMode } from 'hooks';

const mmss = (seconds: number) => {
  const mm = Math.floor(seconds / 60);
  const ss = seconds - mm * 60;

  return [(mm > 9 ? '' : '0') + mm, (ss > 9 ? '' : '0') + ss].join(':');
};

const ShowCounter = () => {
  const [play] = useSound(beep);

  const isPlaySound = useRecoilValue(isPlaySoundAtom);
  const isPaused = useRecoilValue(isPausedAtom);
  const hiitConfiguration = useRecoilValue(hiitConfigurationAtom);
  const setIsRunning = useSetRecoilState(isRunningAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentConfig = useMemo(() => hiitConfiguration.counters[currentIndex], [hiitConfiguration, currentIndex]);
  const { isLightMode } = useDarkMode();
  const currentDuration = useMemo(
    () => (currentConfig.minutes || 0) * 60 + (currentConfig.seconds || 0),
    [currentConfig.minutes, currentConfig.seconds]
  );

  const handleOnFinish = useCallback(() => {
    const nextIndex = currentIndex + 1;

    if (isPlaySound) play();

    if (nextIndex < hiitConfiguration.counters.length) {
      setCurrentIndex(nextIndex);
    } else {
      // resetCountersConfigSet();
      setCurrentIndex(0);
      setIsRunning(false);
    }
  }, [currentIndex, hiitConfiguration.counters.length, isPlaySound, play, setIsRunning]);

  const colors: { 0: ColorHex } & { 1: ColorHex } & ColorHex[] = useMemo(() => {
    switch (currentConfig.type) {
      case 'preparation':
        return ['#9B5BF9', '#9B5BF9', '#9B5BF9', '#9B5BF9'];
      case 'countdown':
        return ['#040267', '#00FAFC', '#9B5BF9', '#F301B0'];
      case 'cooldown':
      case 'round-rest':
      case 'set-rest':
        return ['#00FAFC', '#00FAFC', '#00FAFC', '#00FAFC'];
    }
  }, [currentConfig.type]);

  const message: string = useMemo(() => {
    switch (currentConfig.type) {
      case 'preparation':
        return 'Get Prepared!';
      case 'countdown':
        return '';
      case 'cooldown':
        return 'Cool now...';
      case 'round-rest':
      case 'set-rest':
        return 'Breathe and get ready...';
    }
  }, [currentConfig.type]);

  const myStyles = {
    fontWeight: 400,
    fontSize: '7.5rem',
    color: isLightMode ? 'black' : 'white'
  };
  console.log(
    new Date().getMinutes() + ':' + new Date().getSeconds(),
    currentIndex,
    currentConfig.type,
    currentDuration,
    mmss(currentDuration)
  );

  return (
    <CountdownCircleTimer
      key={currentIndex}
      isPlaying={!isPaused}
      size={350}
      duration={currentDuration}
      colors={colors}
      colorsTime={[30, 15, 5, 0]}
      onComplete={() => {
        handleOnFinish();
        return { shouldRepeat: false };
      }}
    >
      {({ remainingTime }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!!currentConfig.round && (
            <Typography
              variant='caption'
              component='span'
              style={{ fontSize: '0.6rem', color: isLightMode ? 'black' : 'white' }}
            >
              {`Round ${currentConfig.round}, Set ${currentConfig.set}`}
            </Typography>
          )}
          <Typography variant='h2' component='span' style={myStyles}>
            {mmss(remainingTime)}
          </Typography>

          <Typography variant='body1' component='span' style={{ marginTop: 8, color: isLightMode ? 'black' : 'white' }}>
            {message.toUpperCase()}
          </Typography>
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default ShowCounter;
