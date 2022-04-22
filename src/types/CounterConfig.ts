type Time = {
  minutes: number;
  seconds: number;
};

export type CounterConfig = Time & {
  round?: number;
  set?: number;
  title?: string;
  type: "countdown" | "cooldown" | "preparation";
};
