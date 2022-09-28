type Time = {
  minutes: number;
  seconds: number;
};

export type SetCounter = Time & {
  round: number;
  set: number;
  type: 'countdown' | 'cooldown' | 'preparation' | 'set-rest' | 'round-rest';
};

export type HIITConfiguration = {
  rounds: number;
  sets: number;
  counters: SetCounter[];
};
