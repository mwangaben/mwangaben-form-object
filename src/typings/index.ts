export interface ErrorType {
  [name: string]: [string];
}

export interface Callable {
  (arg: () => void): void;
}

export interface CallableString {
  (arg: string): string;
}
