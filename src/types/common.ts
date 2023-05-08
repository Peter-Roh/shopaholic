export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;
