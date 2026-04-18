export interface ErrorType {
  [name: string]: [string];
}

export interface Callable {
  (arg: () => void): void;
}

export interface CallableString {
  (arg: string): string;
}

// src/typings/index.ts
// import MyForm from "../Form";

// Export the instance type
// export type FormInstance<T = Record<string, any>> = MyForm<T>;

// Or better yet, export the class type
// export type FormClass<T = Record<string, any>> = typeof MyForm<T>;

// Your existing interfaces...
