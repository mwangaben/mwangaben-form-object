import { CallableString, ErrorType } from "./typings";
interface FormDataDefaults<T = Record<string, any>> {
    [key: string]: any;
    defaults: T;
}
declare class MyForm<T extends Record<string, any> = Record<string, any>> implements FormDataDefaults<T> {
    [k: string]: any;
    error: ErrorType;
    defaults: T;
    constructor(defaults: T);
    hasError(field: string): boolean;
    errorOut(field: string, callback?: CallableString | null): string | undefined;
    clearAll(): {};
    clear(field: string): void;
    any(): boolean;
    clearInput<K extends keyof T>(field: K): void;
    reset(): this;
    removeProperty<K extends keyof T>(field: K): void;
    removeProperties<K extends keyof T>(fields: K[]): void;
    resetToZero(): this;
    getField<K extends keyof T>(field: K): T[K];
    setField<K extends keyof T>(field: K, value: T[K]): void;
    getData(): T;
}
export default MyForm;
