type Time = {
  minutes: number;
  seconds: number;
};

export type CounterConfig = Time & {
  round?: number;
  set?: number;
  title?: string;
  type: 'countdown' | 'cooldown' | 'preparation' | 'roundrest';
};

export ty

export type PresetType = {
  presetName?: string;
  rounds: number;
  rMinutes: number;
  rSeconds: number;
  sets: number;
  cdMinutes: number;
  cdSeconds: number;
  pMinutes: number;
  pSeconds: number;
  countDownMinutes: number;
  countDownSeconds: number;
};
