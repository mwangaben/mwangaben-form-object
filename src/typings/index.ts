export interface ErrorType {
  [name: string]: [string];
}

export interface Callable {
  (arg: () => void): void;
}

export interface CallableString {
  (arg: string): string;
}

// Export the generic form type
export type FormInstance<T = Record<string, any>> = MyForm<T>;
